import { useEffect, useState } from "react"
import Input from "../components/Input";
import Button from "../components/Button";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({email: "", password: ""});

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = authService.autenticate(formData);
            authService.setLoggedUser(await res);
            return navigate("/");
        } catch (error) {
            console.log("Algo deu errado");
        }
    };

    useEffect(()=>{
        if (!(authService.getLoggedUser() == null)) {
            navigate("/");
        }
    });

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1>Login</h1>
            <form className="flex flex-col gap-6" onSubmit={(e) => void handleSubmit(e)}>
                <Input
                    type="text"
                    variant="secundary"
                    placeholder="Email"
                    value={formData.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                 />
                 <Input 
                    type="password"
                    variant="secundary"
                    placeholder="password"
                    value={formData.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                 />
                 <Button type="submit">Login</Button>
            </form>
            <span className="cursor-pointer" onClick={() => navigate("/register")}>Sign Up</span>
        </div>
    );
};

export default Login;