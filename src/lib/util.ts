import { BadRequestError } from "routing-controllers";
import { reorderPrefColumns } from "./constant";
import { User } from "../entity/User.entity";

export const generateOTP = () => {
  const alphaNumericString = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const stringLength = alphaNumericString.length;
  let otp = "";

  for (let char = 0; char < 6; char++) {
    otp += alphaNumericString[Math.floor(Math.random() * stringLength)];
  }

  return otp;
};

export const generatePassword = () => {
  const alphaNumericString = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const stringLength = alphaNumericString.length;
  let otp = "";

  for (let char = 0; char < 8; char++) {
    otp += alphaNumericString[Math.floor(Math.random() * stringLength)];
  }

  return otp;
};

export const getAuthResponse = (user: User) => {
  // eslint-disable-next-line no-console
  console.log("key value", user);

  return {
    Id: user.Id,
    Email: user.Email,
    FirstName: user.FirstName,
    LastName: user.LastName,
    PhoneNumber: user.PhoneNumber,
    Username: user.UserName,
    UserClass: user.UserClass,
    RoleId: user.UserClass && user.UserClass.RoleId,
    OrganisationId: user.OrganizationId,
    Organisation: user.Organization,
    AllocatedDashboardGraph: user.AllocatedDashboardGraph,
    ExceptionsColumnOrderPreference: user.ExceptionsColumnOrderPreference,
    ExceptionsVoidColumnOrderPreference: user.ExceptionsVoidColumnOrderPreference,
    ExceptionLineItemColumnOrderPreference: user.ExceptionLineItemColumnOrderPreference,
    ExceptionVoidLI_ColumnOrderPreference: user.ExceptionVoidLI_ColumnOrderPreference,
    InvoicesColumnOrderPreference: user.InvoicesColumnOrderPreference,
    InvoicesVoidColumnOrderPreference: user.InvoicesVoidColumnOrderPreference,
    InvoiceLineItemsColumnOrderPreference: user.InvoiceLineItemsColumnOrderPreference,
    InvoiceVoidLI_ColumnOrderPreference: user.InvoiceVoidLI_ColumnOrderPreference,
    ReportsColumnOrderPreference: user.ReportsColumnOrderPreference,
    ExceptionDetailColumnOrderPreference: user.ExceptionDetailColumnOrderPreference,
    ExceptionVoid_Detail_ColumnOrderPreference: user.ExceptionVoid_Detail_ColumnOrderPreference,
    InvoiceDetailColumnOrderPreference: user.InvoiceDetailColumnOrderPreference,
    InvoiceVoid_Detail_ColumnOrderPreference: user.InvoiceVoid_Detail_ColumnOrderPreference,
    TablesPageSizePreferences: user.TablesPageSizePreferences,
  };
};

export const reorderUpdatePrefColumns = (existingPref, newPrefs) => {
  try {
    const removeItems = existingPref.filter(item => !newPrefs.includes(item));
    removeItems.map(element => existingPref.splice(existingPref.indexOf(element), 1));

    const resPref = newPrefs.filter(item => !existingPref.includes(item));
    const finalNewPref = [...existingPref, ...resPref];

    return finalNewPref;
  } catch (err) {
    throw new BadRequestError("ERROR");
  }
};
