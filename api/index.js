"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const model_index_1 = require("./models/model.index");
const common_routes_1 = require("./routes/common.routes");
const user_routes_1 = require("./routes/user.routes");
const regis_class_routes_1 = require("./routes/regis-class.routes");
const class_routes_1 = require("./routes/class.routes");
const post_routes_1 = require("./routes/post.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//connect to db
model_index_1.database.mongoose
    .connect(model_index_1.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to the database!');
})
    .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});
//
//Router list
(0, common_routes_1.CommonRoutes)(app);
(0, user_routes_1.userRoutes)(app);
(0, class_routes_1.ClassRoutes)(app);
(0, regis_class_routes_1.RegisClassRoutes)(app);
(0, post_routes_1.PostRoutes)(app);
//
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
