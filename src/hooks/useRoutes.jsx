import { useAppSelector } from "./hook";
import { authRoutes, notAuthRoutes } from "../constants/routes";
import Page from "../components/Page/Page";

const useRoutes = () => {
    const { isAuth } = useAppSelector((state) => state.auth)
    if (isAuth) return <Page routes={authRoutes} />;
    return <Page routes={notAuthRoutes} />;
};

export default useRoutes;