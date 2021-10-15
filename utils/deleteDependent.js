let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter8557 = { 'addedBy': { '$in': user } };
      const user2377 = await deleteUser(userFilter8557);
      const userFilter1239 = { 'updatedBy': { '$in': user } };
      const user6253 = await deleteUser(userFilter1239);
      const userTokensFilter7662 = { 'userId': { '$in': user } };
      const userTokens7023 = await deleteUserTokens(userTokensFilter7662);
      const userRoleFilter9762 = { 'userId': { '$in': user } };
      const userRole8851 = await deleteUserRole(userRoleFilter9762);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter1471 = { 'roleId': { '$in': role } };
      const routeRole4252 = await deleteRouteRole(routeRoleFilter1471);
      const userRoleFilter7685 = { 'roleId': { '$in': role } };
      const userRole0064 = await deleteUserRole(userRoleFilter7685);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter7815 = { 'routeId': { '$in': projectroute } };
      const routeRole7472 = await deleteRouteRole(routeRoleFilter7815);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter1810 = { 'addedBy': { '$in': user } };
      const user3118Cnt = await countUser(userFilter1810);
      const userFilter7350 = { 'updatedBy': { '$in': user } };
      const user0687Cnt = await countUser(userFilter7350);
      const userTokensFilter0908 = { 'userId': { '$in': user } };
      const userTokens4766Cnt = await countUserTokens(userTokensFilter0908);
      const userRoleFilter3406 = { 'userId': { '$in': user } };
      const userRole9955Cnt = await countUserRole(userRoleFilter3406);
      const userCnt =  await User.countDocuments(filter);
      let response = { user : userCnt  };
      response = {
        ...response,
        ...user3118Cnt,
        ...user0687Cnt,
        ...userTokens4766Cnt,
        ...userRole9955Cnt,
      };
      return response;
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter7294 = { 'roleId': { '$in': role } };
      const routeRole2730Cnt = await countRouteRole(routeRoleFilter7294);
      const userRoleFilter4248 = { 'roleId': { '$in': role } };
      const userRole9595Cnt = await countUserRole(userRoleFilter4248);
      const roleCnt =  await Role.countDocuments(filter);
      let response = { role : roleCnt  };
      response = {
        ...response,
        ...routeRole2730Cnt,
        ...userRole9595Cnt,
      };
      return response;
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter0809 = { 'routeId': { '$in': projectroute } };
      const routeRole1451Cnt = await countRouteRole(routeRoleFilter0809);
      const projectRouteCnt =  await ProjectRoute.countDocuments(filter);
      let response = { projectRoute : projectRouteCnt  };
      response = {
        ...response,
        ...routeRole1451Cnt,
      };
      return response;
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,loggedInUser) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter8167 = { 'addedBy': { '$in': user } };
      const user0567 = await softDeleteUser(userFilter8167);
      const userFilter2402 = { 'updatedBy': { '$in': user } };
      const user6258 = await softDeleteUser(userFilter2402);
      const userTokensFilter4683 = { 'userId': { '$in': user } };
      const userTokens9844 = await softDeleteUserTokens(userTokensFilter4683);
      const userRoleFilter9772 = { 'userId': { '$in': user } };
      const userRole3392 = await softDeleteUserRole(userRoleFilter9772);
      if (loggedInUser && loggedInUser.id)
        return await User.updateMany(filter, {
          isDeleted:true,
          updatedBy:loggedInUser.id
        });
      else
        return await User.updateMany(filter,{ isDeleted:true });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,loggedInUser) =>{
  try {
    if (loggedInUser && loggedInUser.id)
      return await UserTokens.updateMany(filter, {
        isDeleted:true,
        updatedBy:loggedInUser.id
      });
    else
      return await UserTokens.updateMany(filter,{ isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,loggedInUser) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter8944 = { 'roleId': { '$in': role } };
      const routeRole6138 = await softDeleteRouteRole(routeRoleFilter8944);
      const userRoleFilter9925 = { 'roleId': { '$in': role } };
      const userRole3861 = await softDeleteUserRole(userRoleFilter9925);
      if (loggedInUser && loggedInUser.id)
        return await Role.updateMany(filter, {
          isDeleted:true,
          updatedBy:loggedInUser.id
        });
      else
        return await Role.updateMany(filter,{ isDeleted:true });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,loggedInUser) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5971 = { 'routeId': { '$in': projectroute } };
      const routeRole0235 = await softDeleteRouteRole(routeRoleFilter5971);
      if (loggedInUser && loggedInUser.id)
        return await ProjectRoute.updateMany(filter, {
          isDeleted:true,
          updatedBy:loggedInUser.id
        });
      else
        return await ProjectRoute.updateMany(filter,{ isDeleted:true });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,loggedInUser) =>{
  try {
    if (loggedInUser && loggedInUser.id)
      return await RouteRole.updateMany(filter, {
        isDeleted:true,
        updatedBy:loggedInUser.id
      });
    else
      return await RouteRole.updateMany(filter,{ isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,loggedInUser) =>{
  try {
    if (loggedInUser && loggedInUser.id)
      return await UserRole.updateMany(filter, {
        isDeleted:true,
        updatedBy:loggedInUser.id
      });
    else
      return await UserRole.updateMany(filter,{ isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
