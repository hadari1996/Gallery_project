var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function handleLogin(event) {
    return __awaiter(this, void 0, void 0, function () {
        var emailLogin, passwordLogin, data, login, userDB, error, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    emailLogin = event.target.elements.loginEmail.value;
                    passwordLogin = event.target.elements.loginPassword.value;
                    if (!(emailLogin || passwordLogin))
                        throw new Error("email or password not exsits");
                    return [4 /*yield*/, axios.post("/api/v1/users/login", { emailLogin: emailLogin, passwordLogin: passwordLogin })];
                case 1:
                    data = (_a.sent()).data;
                    login = data.login, userDB = data.userDB, error = data.error;
                    if (login) {
                        window.location.href = ("./gallery.html");
                        user = userDB.email;
                        console.log(data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    document.querySelector(".error__message").innerHTML = error_1.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleRegister(event) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, repeat_Password, first_Name, last_Name, age, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    email = event.target.elements.email.value;
                    password = event.target.elements.password.value;
                    repeat_Password = event.target.elements.repeatPassword.value;
                    first_Name = event.target.elements.firstName.value;
                    last_Name = event.target.elements.lastName.value;
                    age = event.target.elements.age.value;
                    if (!email || !password) {
                        throw new Error("Password or email not exsits");
                        document.querySelector(".error__message").innerHTML = "Password or email not exsits";
                    }
                    return [4 /*yield*/, axios.post("/api/v1/users/register", { password: password, email: email, first_Name: first_Name, last_Name: last_Name, repeat_Password: repeat_Password, age: age })];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data);
                    window.location.href = "./gallery.html";
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    document.querySelector(".error__message").innerHTML = error_2.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getUserFromCookie() {
    return __awaiter(this, void 0, void 0, function () {
        var data, login, userDB, userId, username, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/v1/users/get-user-by-cookie")];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data);
                    login = data.login, userDB = data.userDB, userId = data.userId;
                    console.log(userId);
                    if (!userId)
                        window.location.href = ("./index.html");
                    username = document.getElementById("username").innerHTML = "Hello " + userDB.first_name + " " + userDB.last_name;
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    document.querySelector(".error__message").innerHTML = error_3.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleLogout() {
    return __awaiter(this, void 0, void 0, function () {
        var data, logout, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/v1/users/logout")];
                case 1:
                    data = (_a.sent()).data;
                    logout = data.logout;
                    if (logout)
                        window.location.href = ("./index.html");
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleCheckIfUserIsconnected() {
    return __awaiter(this, void 0, void 0, function () {
        var data, userDB, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/v1/users/get-user-by-cookie")];
                case 1:
                    data = (_a.sent()).data;
                    userDB = data.userDB;
                    if (userDB)
                        window.location.href = ("./gallery.html");
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleAddImgPage() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            window.location.href = ("./addImg.html");
            return [2 /*return*/];
        });
    });
}
function handleAddImg(event) {
    return __awaiter(this, void 0, void 0, function () {
        var img_src, alt, data, login, inputs, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    document.querySelector(".error__message").innerHTML = '';
                    img_src = event.target.elements.src.value;
                    alt = event.target.elements.alt.value;
                    if (!(img_src || alt)) {
                        throw new Error("image source or alt is empty");
                        document.querySelector(".error__message").innerHTML = "image source or alt is empty";
                    }
                    return [4 /*yield*/, axios.post("/api/v1/images/allImages", { img_src: img_src, alt: alt })];
                case 1:
                    data = (_a.sent()).data;
                    console.log({ data: data });
                    login = data.login;
                    if (login)
                        console.log("added");
                    inputs = document.querySelectorAll("input");
                    // @ts-ignore
                    inputs.forEach(function (input) {
                        // @ts-ignore
                        input.value = "";
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    document.querySelector(".error__message").innerHTML = error_6.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handelgetUserImages() {
    return __awaiter(this, void 0, void 0, function () {
        var data, imagesDB, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/v1/images")];
                case 1:
                    data = (_a.sent()).data;
                    imagesDB = data.imagesDB;
                    console.log(imagesDB);
                    renderImages(imagesDB);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7);
                    document.querySelector(".error__message").innerHTML = error_7.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handelgetAllImages() {
    return __awaiter(this, void 0, void 0, function () {
        var data, imagesDB, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/v1/images/getallImages")];
                case 1:
                    data = (_a.sent()).data;
                    imagesDB = data.imagesDB;
                    renderImages(imagesDB);
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    console.log(error_8);
                    document.querySelector(".error__message").innerHTML = error_8.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderImages(imageArray) {
    try {
        var root = document.querySelector(".root1");
        root.innerHTML = "";
        for (var index = 0; index < imageArray.length; index++) {
            var imageId = imageArray[index]._id;
            console.log(imageId);
            var imageContainer = document.createElement('div');
            var img = document.createElement('img');
            img.setAttribute("src", "" + imageArray[index].img_source);
            var header = document.createElement('h3');
            var deleteimage = document.createElement('span'); // google icons
            deleteimage.classList.add("material-symbols-outlined");
            deleteimage.innerText = "close";
            deleteimage.setAttribute("id", "" + imageArray[index]._id);
            deleteimage.setAttribute('onclick', "handelDeleteImage(event)");
            header.innerText = "" + imageArray[index].alt;
            imageContainer.appendChild(img);
            img.classList.add("root1_content_img");
            header.classList.add("root1_content_header");
            imageContainer.appendChild(header);
            deleteimage.classList.add("root1_content_del");
            imageContainer.appendChild(deleteimage);
            root.appendChild(imageContainer);
            imageContainer.classList.add("root1_content");
            root.classList.add("root1");
        }
    }
    catch (error) {
        console.log(error);
        document.querySelector(".error__message").innerHTML = error.response.data.error;
    }
}
function handelDeleteImage(event) {
    return __awaiter(this, void 0, void 0, function () {
        var id, data, imagesDB, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log(event.target);
                    id = event.target.id;
                    return [4 /*yield*/, axios["delete"]("/api/v1/images/" + id)];
                case 1:
                    data = (_a.sent()).data;
                    imagesDB = data.imagesDB;
                    console.log(imagesDB);
                    renderImages(imagesDB);
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    console.error(error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handelupdateUserImages() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                window.location.href = ("./updateImg.html");
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function handleUpdateImg(event) {
    return __awaiter(this, void 0, void 0, function () {
        var src, alt, data, ok, inputs, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    src = event.target.elements.src.value;
                    alt = event.target.elements.alt.value;
                    document.querySelector(".error__message").innerHTML = '';
                    return [4 /*yield*/, axios.patch("/api/v1/images/" + alt, { src: src })];
                case 1:
                    data = (_a.sent()).data;
                    ok = data.ok;
                    document.querySelector(".root").innerHTML = '';
                    inputs = document.querySelectorAll("input");
                    // @ts-ignore
                    inputs.forEach(function (input) {
                        // @ts-ignore
                        input.value = "";
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    console.log(error_10);
                    document.querySelector(".error__message").innerHTML = error_10.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleSearch(event) {
    return __awaiter(this, void 0, void 0, function () {
        var root, searchString, alt, data, altDB, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    root = document.querySelector(".root");
                    searchString = event.target.value;
                    alt = event.target.value // can do with select input
                    ;
                    if (searchString === "") {
                        root.innerHTML = "";
                        return [2 /*return*/];
                    }
                    console.log(searchString);
                    return [4 /*yield*/, axios.post("/api/v1/images/" + alt, { searchString: searchString })];
                case 1:
                    data = (_a.sent()).data;
                    altDB = data.altDB;
                    console.log(altDB);
                    renderListToRoot(altDB);
                    return [3 /*break*/, 3];
                case 2:
                    error_11 = _a.sent();
                    console.log(error_11);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderListToRoot(arrayToList) {
    try {
        var root = document.querySelector(".root");
        var html_1 = "<ol>";
        arrayToList.forEach(function (element) {
            html_1 += "<li> " + element.alt + "</li>";
        });
        html_1 += '</ol>';
        root.innerHTML = html_1;
    }
    catch (error) {
        console.error(error);
    }
}
