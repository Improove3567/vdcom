import LoginPage from "../components/loginPage/LoginPage";
import RegisterPage from "../components/registerPage/RegisterPage";
import EditUserPage from "../pages/EditUserPage/EditUserPage";
import CreateUserPage from "../pages/createUser/CreateUserPage";
import HomePage from "../pages/homePage/HomePage";

export const notAuthRoutes = [
    {
        title: 'Login Page',
        path: '/',
        Component: LoginPage,
    },
    {
        title: 'Register Page',
        path: '/registration',
        Component: RegisterPage,
    },
];

export const authRoutes = [
    {
        title: 'HomePage',
        path: '/',
        Component: HomePage,
    },
    {
        title: 'Create user',
        path: '/create-user',
        Component: CreateUserPage,
    },
    {
        title: 'Edit',
        path: '/contact/:id',
        Component: EditUserPage,
    },
];