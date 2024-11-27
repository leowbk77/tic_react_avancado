import { useEffect, useState } from "react"
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const SignUp = () => {
    const [formData, setFormData] = useState({email: "", password: "", username: "",});

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        }).then((res) => res.json())
        .then(() => {
            navigate("/login");
        });
    };
    
    useEffect(()=>{
        if (!(authService.getLoggedUser() == null)) {
            navigate("/");
        }
    });

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1>Sign Up</h1>
            <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
                <Input
                    type="text"
                    variant="secundary"
                    placeholder="Username"
                    value={formData.username} 
                    name="username"
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type="email"
                    variant="secundary"
                    placeholder="Email"
                    value={formData.email} 
                    name="email"
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type="password"
                    variant="secundary"
                    placeholder="Password"
                    value={formData.password} 
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUp;