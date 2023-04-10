// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import { CODE, MSG, KEY, USER_STATUS } from '../const/common'
// import { sendRes } from '../helper/response-handler'
// import { database } from '../models/model.index'
// import { userValidator } from '../validator/user-validator'

// const Users = database.users
// // const redis = new Redis();
// //create accessToken function
// const createAccessToken = async (phone, role) => {
//   const token = jwt.sign({ phone: phone, role: role }, KEY.ACCESS_TOKEN, {
//     expiresIn: '7d',
//   })
//   return token
// }

// const encrypter = async (str) => {
//   const encryptedStr = await bcrypt.hash(str, 6)
//   return encryptedStr
// }

// export const Register = async (req, res) => {
//   try {
//     const { name, password, role, phone, gender, yOB } = req.body
//     //validate body
//     let bodyValid = userValidator.register(req.body)
//     // console.log(bodyValid);
//     if (!bodyValid.valid) {
//       return sendRes(res, CODE.FAILED, null, bodyValid.msg)
//     }
//     //check exist
//     const existPhone = await Users.findOne({ phone })
//     if (existPhone) {
//       return sendRes(res, CODE.EXIST, null, MSG.EXISTED)
//     }
//     //hash password
//     encryptedPassword = await encrypter(password)
//     //create new user
//     const user = await Users.create({
//       password: encryptedPassword,
//       name: name,
//       phone: phone,
//       role: role,
//       gender: gender,
//       yOB: yOB,
//       status: USER_STATUS[0],
//       deleted: false,
//     })

//     if (user) {
//       sendRes(res, CODE.CREATED, null)
//     } else {
//       sendRes(res, CODE.FAILED, MSG.UNKNOW)
//     }
//   } catch (err) {
//     console.log('register error catched', err)
//     sendRes(res, CODE.FAILED, null)
//   }
// }

// export const Login = async (req, res) => {
//   const { phone, password } = req.body
//   let bodyValid = userValidator.login(req.body)
//   if (!bodyValid.valid) {
//     return res.CODE(CODE.FAILED).send(bodyValid.msg)
//   }
//   try {
//     //find user
//     const user = await Users.findOne({ phone })
//     const passwordValid = await bcrypt.compare(password, user.password)
//     //handler response
//     if (user && passwordValid) {
//       const accessToken = await createAccessToken(phone, user.role)
//       // console.log(user.role);
//       return sendRes(res, CODE.OK, { accessToken })
//     } else {
//       return sendRes(res, CODE.FAILED, null)
//     }
//   } catch (err) {
//     sendRes(res, CODE.INTERNAL, err)
//   }
// }

// export const Auth = async (req, res) => {
//   try {
//     const user = await Users.findOne({ phone: req.user.phone }, { password: 0 })
//     if (user) {
//       return sendRes(res, CODE.OK, user)
//     } else {
//       return sendRes(res, CODE.FAILED, null)
//     }
//   } catch (error) {
//     sendRes(res, CODE.INTERNAL, error)
//   }
// }
