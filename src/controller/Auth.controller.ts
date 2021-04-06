import {
    Post,
    Get,
    Req,
    Body,
    Res,
    Controller,
    Param
  } from "routing-controllers";
  // import jwt from "jsonwebtoken";
  // import * as moment from "moment-timezone";

import { OpenAPI } from "routing-controllers-openapi";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import { State } from "../entity/State.entity";
import { City } from "../entity/City.entity";
import { UserInput } from "../input/User.input";
import * as path from "path";
import { Media } from "../entity/Media.entity";
const fs = require("fs");
const { SITE_URL } = process.env;


const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51IVsneDW7kGLmP2PDbBk1JTStM3XQFqdffRjVgvn5LIMUD4OaDTNLhuh3MTFwhfMGTqAp9FD5N1GfzR5iFNQFshb00Qc4YLJGv')
  
// @Authorized()
@Controller()
export class ServiceController {
  @OpenAPI({
    summary: `login api
        `,
  })
  @Post("/login")
  async post(@Req() request: Request, @Res() response: Response, @Body() param: any) {
     try {
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({ relations:["role"], where: [{ email: param.email, password: param.password  },{ username: param.email, password: param.password  }]});
       
        if(!user)  return response.json({ code: 404 , message: "user not found" });
        const token = jwt.sign(
          {
              id: user?.id,
              email: user?.email,
          },
         "mysecretjwtkey");
        // eslint-disable-next-line no-console
        // console.error("[Error]: ", user, token);
       await userRepo.update(user.id, {token}).catch( error =>{
          return response.json({ status: "Bad Request", error });
        })

        return response.json({
            status: "ok",
            code: 200,
            token,
            roleName: user?.role?.name
          });

    } catch (error) {
      return response.json({ status: "Bad Request", error,  param });
    }

  }
  @Post("/create-user")
  async createUser( @Res() response: Response, @Body() newUser: UserInput) {
     try {
        const userRepo = getRepository(User);
        const userDetail = await userRepo.findOne({ email: newUser.email });
       
        if(userDetail)  return response.json({ code: 201 , message: "Already Exit" });

        const userNameDetail = await userRepo.findOne({ username: newUser.username});
        if(userNameDetail)  return response.json({ code: 201 , message: "User name Already Exit" });

        if(newUser.role_id === 1 || newUser.role_id === 2) {
          const paymentIntent = await stripe.charges.create({
              amount: newUser.amount ,
              currency: "usd",
              receipt_email: newUser.email,
              source: newUser.stripe_id,
              description: 'BCU',
              shipping: {
                name: newUser.name,
                address: {
                  line1: "bcu",
                  postal_code: newUser.zip_code,
                  city: newUser.city,
                  state: newUser.state,
                  country: newUser.country,
                },
              },
              
            });

            
            if (!paymentIntent) throw new Error('charge unsuccessful')
        }
          const user = new User();
          user.name = newUser.name
          user.email = newUser.email
          user.state = newUser.state
          user.city = newUser.city
          user.country = newUser.country
          user.password = newUser.password
          user.zip_code = newUser.zip_code
          user.role_id = newUser.role_id
          user.username = newUser.username,
          user.stripe_id = newUser.stripe_id
          user.active = 1
  
          await userRepo.insert(user).catch( error =>{
            return response.json({ status: "Bad Request", error });
          })
  
          return response.json({
              status: "ok",
              code: 200,
            });

    } catch (error) {
      return response.json({ code: 400, status: "Bad Request", error, newUser });
    }

  }

  @Get("/state-list")
  async getState(@Res() response: Response) {
     try {
        const stateRepo = getRepository(State);
        const state = await stateRepo.find();
               
        return response.json({
            status: "ok",
            code: 200,
            state
          });

    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }

  }

  @Post("/city-list")
  async getCity(@Res() response: Response,  @Body() param: any) {
     try {
        const cityRepo = getRepository(City);
        const stateRepo = getRepository(State);
        let city
        const state = await stateRepo.findOne({ where: {STATE_CODE : param.stateId}});
        if(state) {
         city = await cityRepo.find({ where : { ID_STATE: state.id}});
        }
        return response.json({
            status: "ok",
            code: 200,
            city
          });

    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }

  }
  @Get("/video/:id") 
  async getVideo(
    @Res() response: Response,
    @Req() request: Request,
    @Param("id") id: number,
  ){
    const mediaRepo = getRepository(Media);
     
    const mediaDetail = await mediaRepo.findOne({id: id});
  // Ensure there is a range given for the video
  // const range = req.headers.range;
  if (!mediaDetail) {
    return response.status(400).send("media not found");
  }

  if (mediaDetail.name === "") {
    return response.status(400).send("media not found");
  }
  
  // get video stats (about 61MB)
  const videoPath = path.join(__dirname,`../../public/${mediaDetail.name}`);
  // eslint-disable-next-line no-console
  // console.log("sssssssssssssss", request.headers.referer)
  if(request.headers.referer !== SITE_URL) {
    return response.status(401).send("not allow");
  
  }
  // const headers = {
  //   // "Content-Range": `bytes ${start}-${end}/${videoSize}`,
  //   // "Accept-Ranges": "bytes",
  //   // "Content-Length": contentLength,
  //   "Content-Type": "video/mp4",
  // };

  // HTTP Status 206 for Partial Content
  response.writeHead(200);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath);

  return videoStream.pipe(response) ;
}

  
}
