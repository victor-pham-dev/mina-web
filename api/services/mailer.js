"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailService = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmailService = (to, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.FROM_EMAIL);
    try {
        const msg = {
            to: [to],
            from: process.env.FROM_EMAIL,
            subject: subject,
            html: `<strong>${body}</strong>`,
        };
        const result = yield mail_1.default.send(msg);
    }
    catch (_e) {
        console.log('Error in sendEmail: ', _e.response.body);
    }
});
exports.sendEmailService = sendEmailService;
