"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const model_index_1 = require("./models/model.index");
const common_routes_1 = require("./routes/common.routes");
const user_routes_1 = require("./routes/user.routes");
const regis_class_routes_1 = require("./routes/regis-class.routes");
const class_routes_1 = require("./routes/class.routes");
const post_routes_1 = require("./routes/post.routes");
const students_router_1 = require("./routes/students.router");
const question_routes_1 = require("./routes/question.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(express.json())
app.use(express_1.default.json({ limit: '25mb' }));
app.use(express_1.default.urlencoded({ limit: '25mb', extended: true }));
//connect to db
model_index_1.database.mongoose
    .connect(model_index_1.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    //console.log('Connected to the database!')
})
    .catch((err) => {
    //console.log('Cannot connect to the database!', err)
    process.exit();
});
//
//Router list
(0, common_routes_1.CommonRoutes)(app);
(0, user_routes_1.userRoutes)(app);
(0, class_routes_1.ClassRoutes)(app);
(0, regis_class_routes_1.RegisClassRoutes)(app);
(0, post_routes_1.PostRoutes)(app);
(0, students_router_1.StudentRoutes)(app);
(0, question_routes_1.QuestionRoutes)(app);
app.get('/', (req, res) => {
    res.send('This is mina api');
});
//
const PORT = process.env.PORT;
app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}.`)
});
