import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
    email: z.string().email({message: "Enter a Valid Email"}).nonempty({message: 'Email is Required'}),
    password: z.string().nonempty({message: 'Password is required'}).min(6, {message: 'Password is too short [min 6 chars]'}),
});

const LoginForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/login', data);
            const token =res.data.token;
            if(!token){
                return  console.log("Token not found.");
            }
            document.cookie = `token=${token}`;
            console.log("Token:", token);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Email</span>
                                {errors.email && <p className={"px-5"}>{errors.email.message}</p>}
                            </label>
                            <input {...register('email')} type="email" placeholder="email"
                                   className="input input-bordered"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                                {errors.password && <p className={"px-5 "}>{errors.password.message}</p>}
                            </label>
                            <input {...register('password')} type="password" placeholder="password"
                                   className="input input-bordered"/>
                            {/*<label className="label">*/}
                            {/*    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>*/}
                            {/*</label>*/}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;