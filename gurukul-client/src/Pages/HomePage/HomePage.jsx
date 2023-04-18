
import React, { useContext, useState } from 'react';
import { AuthContext } from './../../Context/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const {user} = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isStudent, setIsStudent] = useState(null);
    const [currently, setCurrently   ] = useState(null);
    const [loader, setLoader] = useState(false);
    const Navigate = useNavigate()

    const onSubmit = data =>{
        setLoader(true)

        if(!user?.email){

            setLoader(false)
            
         return 
        }
       const serveData = {
           email: user.email,
           name: user.displayName,
           ...data
        }

         //save user serve in database

    
        fetch(`https://gurukul-server-mdnazmulhasanniloy.vercel.app/serve`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(serveData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('user serve is successfully added')
                Navigate()
                setLoader(false)
            })
            .catch(error => {
                setLoader(false)
                toast.error(error.message)
            })
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center mt-5'>
        <div className=" w-3/6 min-h-16 shadow-2xl p-4">
            <h1 className='text-4xl text-center font-bold mb-5'>{user?.displayName} Welcome to Geeks of Gurukul</h1>
            
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>

                {/* Question1 */}
                <div className="p-4">
                    <h1 children="mt-4 mb-3">Are you Currently Studying?</h1>
                    <div className="flex gap-3">

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input type="radio" name="AreYouCurrentlyStudying" onClick={(e)=>setIsStudent(e.target.value)} {...register("AreYouCurrentlyStudying")} 
                                        value="Yes I am studying" className="radio checked:bg-blue-500"/>
                                <span className="label-text ml-3">Yes I am studying</span> 
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input type="radio" {...register("AreYouCurrentlyStudying")} onClick={(e)=>setIsStudent(e.target.value)} name="AreYouCurrentlyStudying"
                                        value="No I am not studying" className="radio checked:bg-blue-500"/>

                                <span className="label-text ml-3">No I am not studying</span> 
                            </label>
                        </div>
                    </div>
                </div>

                {/* Question2 */}

                { isStudent === "Yes I am studying" &&
                    <div className="my-3 p-4">
                        <h1 children="mb-3">Are You currently?</h1>
                        <div className="flex gap-3">

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="radio" name="AreYouCurrently" {...register("AreYouCurrently")} onClick={(e)=>setCurrently(e.target.value)}
                                            value="in School" className="radio checked:bg-blue-500"/>
                                    <span className="label-text ml-3">in School</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="radio" {...register("AreYouCurrently")}  onClick={(e)=>setCurrently(e.target.value)}name="AreYouCurrently"
                                            value="in Collage" className="radio checked:bg-blue-500"/>

                                    <span className="label-text ml-3">in Collage</span> 
                                </label>
                            </div>
                        </div>
                    </div>
                }

               


                {/* Question3 */}

                { isStudent === "Yes I am studying" && currently === "in School" &&
                    <div className="my-3 p-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">School Name</span>
                            </label>
                            <input type="text" placeholder="Enter Your School Name" {...register("schoolName",{
                                    required: "This field is required", 

                                })} className="input input-bordered w-full" />
                            {
                                    errors.schoolName && <p className=' text-red-600'>{errors.schoolName.message}</p>
                            }
                        </div>

                        <div className="form-control mt-3">
                        <label className="label">
                                <span className="label-text">Select your Grade</span>
                            </label>

                            <select className="select select-primary w-full max-w-xs" {...register("Grade",{
                                    required: "This field is required", 

                                })}> 
                                <option>Six</option>
                                <option>Seven</option>
                                <option>Eight</option>
                                <option>Nine</option>
                                <option>Ten</option>
                                <option>Eleven</option> 
                                <option>Towelve</option>
                            </select>
                            {
                                    errors.Grade && <p className=' text-red-600'>{errors.Grade.message}</p>
                            }
                        </div>
                    </div>

                    }
                    { isStudent === "Yes I am studying" && currently ==="in Collage" &&
                      <div className="my-3 p-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Collage Name</span>
                            </label>
                            <input type="text" placeholder="Enter Your School Name" {...register("collageName",{
                                    required: "This field is required", 

                                })} className="input input-bordered w-full" />
                            {
                                    errors.collageName && <p className=' text-red-600'>{errors.collageName.message}</p>
                            }
                        </div>



                        <div className="form-control mt-3">
                        <label className="label">
                                <span className="label-text">Select your Degree</span>
                            </label>
                            <select className="select select-primary w-full max-w-xs" onChange={()=>{}} {...register("Degree",{
                                    required: "This field is required", 

                                })}> 
                                <option>BTech</option>
                                <option>BSC</option>
                                <option>BBA</option>
                                <option>MBA</option>
                            </select>
                            {
                                    errors.Degree && <p className=' text-red-600'>{errors.Degree.message}</p>
                            }
                        </div>


                        <div className="form-control mt-3">
                        <label className="label">
                                <span className="label-text">Select Graduation Year</span>
                            </label>
                            <select className="select select-primary w-full max-w-xs" {...register("Graduation",{
                                    required: "This field is required", 

                                })}> 
                                <option>2010</option>
                                <option>2011</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                            {
                                    errors.Graduation && <p className=' text-red-600'>{errors.Graduation.message}</p>
                            }
                        </div>
                    </div>

                }

                {
                    isStudent=== "No I am not studying" && 
                    <div className="my-3 p-4">
                        <h1 children="mb-3">are you Currently?</h1>
                        <div className="flex gap-3">

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="radio" name="AreYouCurrently" {...register("AreYouCurrently")} onClick={(e)=>setCurrently(e.target.value)}
                                            value="Looking for job" className="radio checked:bg-blue-500"/>
                                    <span className="label-text ml-3">Looking for job</span> 
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="radio" {...register("AreYouCurrently")}  onClick={(e)=>setCurrently(e.target.value)}name="AreYouCurrently"
                                            value="Currently working" className="radio checked:bg-blue-500"/>

                                    <span className="label-text ml-3">Currently working</span> 
                                </label>
                            </div>
                        </div>
                    </div>
                }
                {
                    isStudent=== "No I am not studying" && currently === "Looking for job" &&
                    <div className="my-3 p-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Collage Name</span>
                            </label>
                            <input type="text" placeholder="Enter Your School Name" {...register("collageName",{
                                    required: "This field is required", 

                                })} className="input input-bordered w-full" />
                                {
                                    errors.collageName && <p className=' text-red-600'>{errors.collageName.message}</p>
                                }
                        </div>

                        <div className="form-control mt-3">
                            <select className="select select-primary w-full max-w-xs" onChange={()=>{}} {...register("Degree",{
                                    required: "This field is required", 

                                })}>
                                <option disabled selected>Latest Degree?</option>
                                <option>BTech</option>
                                <option>BSC</option>
                                <option>BBA</option>
                                <option>MBA</option>
                            </select>
                            {
                                    errors.Degree && <p className=' text-red-600'>{errors.Degree.message}</p>
                            }
                        </div>
                        <div className="form-control mt-3">
                        <label className="label">
                                <span className="label-text">Select Graduation Year??</span>
                            </label>
                            <select className="select select-primary w-full max-w-xs" {...register("graduationYear",{
                                    required: "This field is required", 

                                })}> 
                                <option>2010</option>
                                <option>2011</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                            {
                                    errors.graduationYear && <p className=' text-red-600'>{errors.graduationYear.message}</p>
                            }
                        </div>
                    </div>
                }
                {
                    isStudent=== "No I am not studying" && currently === "Currently working" &&
                    <div className="my-3 p-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Company Name</span>
                            </label>
                            <input type="text" placeholder="Enter Your School Name" {...register("collageName",{
                                    required: "This field is required", 

                                })} className="input input-bordered w-full" />
                            {
                                    errors.collageName && <p className=' text-red-600'>{errors.collageName.message}</p>
                            }
                        </div>


                        <div className="form-control mt-3">
                        <label className="label">
                                <span className="label-text">Years of Experience?</span>
                            </label>
                            <select className="select select-primary w-full max-w-xs" onChange={()=>{}} {...register("experience",{
                                    required: "This field is required", 

                                })}>
                                <option>Six</option>
                                <option>Seven</option>
                                <option>Eight</option>
                                <option>Nine</option>
                                <option>Ten</option>
                                <option>Eleven</option> 
                                <option>Towelve</option>
                            </select>
                            {
                                    errors.experience && <p className=' text-red-600'>{errors.experience.message}</p>
                            }
                        </div>


                        <div className="form-control mt-3">
                        <label className="label">
                                <span className="label-text">Occupation?</span>
                            </label>
                            <select className="select select-primary w-full max-w-xs" {...register("occupation",{
                                    required: "This field is required", 

                                })}> 
                                <option>Full stack developer</option>
                                <option>Sr. full stack developer</option>
                                <option>Ai Engineers</option>
                            </select>

                            {
                                    errors.occupation && <p className=' text-red-600'>{errors.occupation.message}</p>
                            }
                        </div>
                    </div>
                }


                    <div className="form-control mt-6">
                            <button type='submit' className={`${loader ? 'loading' : 'text-white'} 
                                                            btn btn-accent text-white hover:bg-white hover:text-accent 
                                                            transition-all duration-500`}>
                                {loader ? 'Loading...' : 'Submit'}
                            </button>
                        </div>

                </form>
            </div>
            </div>
        </div>
    );
};

export default HomePage;