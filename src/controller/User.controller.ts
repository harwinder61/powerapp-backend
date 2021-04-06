import {
    Post,
    Get,
    Req,
    Body,
    Res,
    Controller,
    Authorized,
    UploadedFile,
    Delete,
    Param,
    
  } from "routing-controllers";

  import { IsNull, Not } from "typeorm";
  // import jwt from "jsonwebtoken";
  import * as moment from "moment-timezone";

import { OpenAPI } from "routing-controllers-openapi";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import { Media } from "../entity/Media.entity";
import { Category } from "../entity/Category.entity"
// import { UserInput } from "../input/User.input";
const { URL } = process.env;

import { fileUploadOptions } from "../lib/fileUpload";

const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51IVsneDW7kGLmP2PDbBk1JTStM3XQFqdffRjVgvn5LIMUD4OaDTNLhuh3MTFwhfMGTqAp9FD5N1GfzR5iFNQFshb00Qc4YLJGv')
  
@Authorized()
@Controller()
export class UserController {
  @OpenAPI({
    summary: `login api
        `,
  })
  @Get("/get-profile")
  async getProfile(@Req() request: Request, @Res() response: Response, @Body() param: any) {
     try {
        const userRepo = getRepository(User);
        const { authorization } = request.headers;
        let userId 
        jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
          userId = decoded?.id
        //   console.log(decoded.foo) // bar
        });
     
        const user = await userRepo.findOne({ relations: ["role"], where:{ id: userId }});
       
        
        return response.json({
            status: "ok",
            code: 200,
            user
          });

    } catch (error) {
      return response.json({ status: "Bad Request", error,  param });
    }

  }

  @OpenAPI({
    summary: `Upload profile`,
  })
  @Post("/upload-profile")
  async uploadProfile(
    @Req() request: Request,
    @Res() response: Response,
    @Body() param: any,
    @UploadedFile("image", { options: fileUploadOptions() }) image: any
  ) {
    try {
      const userRepo = getRepository(User);
      const { authorization } = request.headers;
      let userId 
      jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
        userId = decoded?.id
      });
      // console.log("image", image)
      await userRepo.update(
        { id: userId },
        { profile_pic: URL + image.filename }
      );
      return response.json({
        status: 200,
        message: "SUCCESS",
        // data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }

  @OpenAPI({
    summary: `Upload cover image`,
  })
  @Post("/upload-cover-image")
  async uploadCover(
    @Req() request: Request,
    @Res() response: Response,
    @Body() param: any,
    @UploadedFile("image", { options: fileUploadOptions() }) image: any
  ) {
    try {
      const userRepo = getRepository(User);
      const { authorization } = request.headers;
      let userId 
      jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
        userId = decoded?.id
      });

           // eslint-disable-next-line no-console
          //  console.log('loginDetail', param)
  
   
      await userRepo.update(
        { id: userId },
        { [param?.fieldName]: URL + image.filename }
      );
      return response.json({
        status: 200,
        message: "SUCCESS",
        
        data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }

  @OpenAPI({
    summary: `Upload cover image`,
  })
  @Post("/update-user-info")
  async updateUserInfo(
    @Req() request: Request,
    @Res() response: Response,
    @Body() param: any,
    @UploadedFile("image", { options: fileUploadOptions() }) image: any
  ) {
    try {
      const userRepo = getRepository(User);
      const { authorization } = request.headers;
      let userId 
      jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
        userId = decoded?.id
      });
   
      await userRepo.update(
        { id: userId },
        param
      );
      return response.json({
        status: 200,
        message: "SUCCESS",
        // data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }

  @OpenAPI({
    summary: `Upload cover image`,
  })
 
  @Post("/media-list")
  async getMedaiList(
    @Req() request: Request,
    @Res() response: Response,
    @Body() param: any,
  ) {
    try {
     
      const userRepo = getRepository(User);
      const { authorization } = request.headers;
      let userId 
      jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
        userId = decoded?.id
      });
      // 
     const mediaList = await userRepo.findAndCount({
        relations: ["medias"],
        where: {
          id: param?.currentUser ? userId : Not(IsNull()),
          // medias: { id :  Not(IsNull())}  
        }
        
       });
     
       // eslint-disable-next-line no-console
       console.log("Ssssssssssss",mediaList )
      return response.json({
        status: 200,
        message: "SUCCESS",
        mediaList: mediaList[0],
        mediaCount: mediaList[1]
        // data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }


  @OpenAPI({
    summary: `Upload cover image`,
  })
  @Post("/upload-media")
  async uploadMeda(
    @Req() request: Request,
    @Res() response: Response,
    @Body() param: any,
    @UploadedFile("image", { options: fileUploadOptions() }) image: any
   ) {
    try {
      const mediaRepo = getRepository(Media);
      const { authorization } = request.headers;
      let userId 
      jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
        userId = decoded?.id
      });

      console.log("param", param, image.filename)
   
      mediaRepo.insert({
        "title": param.title,
        "type": param.type,
        "category": param.category,
        "file_url": URL + image.filename,
        "name": image.filename,
        "active": 1,
        userId,
      })

      return response.json({
        status: 200,
        message: "SUCCESS",
        // data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }

  @OpenAPI({
    summary: `Upload cover image`,
  })
  @Delete("/media/:id")
  async deleteMedia(
    @Req() request: Request,
    @Res() response: Response,
    @Param("id") id: string,
  ) {
    try {
      const mediaRepo = getRepository(Media);
     const mediaList = await mediaRepo.update(id,{ delete_at: moment().toDate() });

      return response.json({
        status: 200,
        message: "SUCCESS",
        mediaList: mediaList[0],
        mediaCount: mediaList[1]
        // data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }

  @Get("/category-list")
  async getCategoryList(
    @Res() response: Response,
  ) {
    try {
      const categoryRepo = getRepository(Category);
 
      const categoryList = await categoryRepo.find();

      return response.json({
        status: 200,
        message: "SUCCESS",
        categoryList,
        // data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }

  @OpenAPI({
    summary: `Upload profile`,
  })
  @Post("/change-password")
  async changePassword(
    @Req() request: Request,
    @Res() response: Response,
    @Body() param: any,
  ) {
    try {
      const userRepo = getRepository(User);
      const { authorization } = request.headers;
      let userId 
      jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
        userId = decoded?.id
      });
      // console.log("image", image)
      await userRepo.update(
        { id: userId },
        { password: param.password  }
      );
      return response.json({
        status: 200,
        message: "SUCCESS",
        // data: { name: image.filename, path: URL + image.filename },
      });
    } catch (error) {
      return response.json({ status: "Bad Request", error });
    }
  }



}
