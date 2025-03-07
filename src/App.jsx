import React from "react";
import SignupForm from "./components/SignupForm";
import pattern from "./assets/pattern.jpg";
import { FormProvider } from "./FormProvider";
const App = () => {
  return (
    <FormProvider>
      <div
        className="h-full min-h-screen bg-gray-200 flex justify-center items-center"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-3/4 h-3/4 bg-gray-100 rounded-2xl shadow-2xl ">
          <h1 className="text-center m-5 text-4xl text-indigo-800">Sign Up</h1>
          <SignupForm />
        </div>
      </div>
    </FormProvider>
  );
};

export default App;
