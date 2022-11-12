import { isDate } from "util/types";

export function validEmailPassword(body: any) {
  if (!body.email || !body.password) {
    throw new Error("Email and password are mandatory.");
  }
  return {
    dto: {
      email: body.email.toString(),
      password: body.password.toString(),
    },
  };
}

export function validAuthorization(authorization?: string) {
  if (!authorization || authorization.split(" ").length !== 2) {
    return {
      message: "Authorization is mandatory.",
    };
  }
  return {
    dto: {
      token: authorization.split(" ")[1].toString(),
    },
  };
}

export function validName(body: any) {
  if (!body.name) {
    return {
      message: "name is mandatory.",
    };
  }
  return {
    dto: {
      name: body.name.toString(),
    },
  };
}

export function validIdNamePermissionSetIds(body: any) {
  if (!body.id || !body.name || !body.permissionSetIds) {
    return {
      message: "id, name and permission set ids are mandatory.",
    };
  }
  if (!Array.isArray(body.permissionSetIds)) {
    return {
      message: "permission set Ids should be an array.",
    };
  }
  return {
    dto: {
      id: body.id.toString(),
      name: body.name.toString(),
      permissionSetIds: body.permissionSetIds as string[],
    },
  };
}

export function validId(query: any) {
  if (!query.id) {
    return {
      message: "Id is mandatory.",
    };
  }
  return {
    dto: {
      id: query.id.toString(),
    },
  };
}

export function validIdName(body: any) {
  if (!body.id || !body.name) {
    return {
      message: "id and name are mandatory.",
    };
  }
  return {
    dto: {
      id: body.id.toString(),
      name: body.name.toString(),
    },
  };
}

export function validPermissionSetIdPermissionName(body: any) {
  if (!body.permissionSetId || !body.permissionName) {
    return {
      message: "permission set id and permission name are mandatory.",
    };
  }
  return {
    dto: {
      permissionSetId: body.permissionSetId.toString(),
      permissionName: body.permissionName.toString(),
    },
  };
}


export function validUserWithPassword(body:any) {
    if (
      !body.firstName ||
      !body.lastName ||
      !body.userName ||
      !body.password ||
      !body.email
    ) {
      return {
        message:
          "firstName, lastName, userName, email and password are mandatory.",
      };
    }
    return {
      dto: {
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        email: body.email,
        password: body.password
      },
    };
  }

export function validUser(body: any) {
    if (
      !body.id ||
      !body.firstName ||
      !body.lastName ||
      !body.userName ||
      !body.email
    ) {
      return {
        message:
          "id, firstName, lastName, userName and email are mandatory.",
      };
    }
    return {
      dto: {
        id: body.id,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        userName: body.userName,
        password: body.password
      },
    };
  }
  
  export function validLicenseAttribution(body: any) {
    if (
      !body.userId ||
      !body.licenseId ||
      !body.expirationDate ||
      body.suspended === undefined ||
      body.suspended === null
    ) {
      return {
        message:
          "user id, license id, expiration date and suspended are mandatory.",
      };
    }
    if(!isDate(new Date(body.expirationDate))) { return {message: "The date is not a valid date."}}
    return {
      dto: {
        userId: body.userId,
        licenseId: body.licenseId,
        expirationDate: new Date(body.expirationDate),
        suspended: body.suspended,
      },
    };
  }
