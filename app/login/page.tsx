'use client'
import Button from "@ui/button"

import { login , loginWithGoogle} from "./actions";



const Login = () => {
// TODO:login for redirect to dashbaord if token exist

  return (

    <main className="bg-zinc-100 flex items-center justify-center min-h-screen h-fit py-4 ">
      <div className="bg-white p-5 w-96 h-1/2 rounded-large">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-800 capitalize">sign in</h1>
        </div>

        <div className="flex gap-1 justify-between my-5">
          <button 
          className="rounded-full bg-zinc-100 text-zinc-800 hover:bg-lime-500 hover:text-white text-xs py-3 px-5 w-full"
          onClick={() => loginWithGoogle()}
          >
            Sign in with Google</button>
          <button className="rounded-full bg-zinc-100 text-zinc-800 hover:bg-lime-500 hover:text-white text-xs py-3 px-5 w-full">Sign in with LinkedIn</button>
        </div>

        <p className="text-zinc-400 text-xs capitalize mt-2 font-light text-center">OR</p>

        <form action={login} method="POST" className="flex flex-col gap-2 my-5">
         
          <input type="text" name="username" className="w-full bg-zinc-100 rounded-full py-3 px-5 text-xs placeholder:text-zinc-400 placeholder:text-xs focus:outline-none" placeholder="Username" />
          <input type="password" name="password" className="w-full bg-zinc-100 rounded-full py-3 px-5 text-xs placeholder:text-zinc-400 placeholder:text-xs focus:outline-none" placeholder="Password" />
         
          <p className="text-lime-500 text-xs capitalize my-2 text-right font-normal">Forget Password?</p>

          <Button lable="login" active="true" className="rounded-full bg-lime-400  text-sm py-3 px-5 text-center w-full" />
        </form>

      </div>
    </main>
  )

}


export default Login;