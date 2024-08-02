import { useActivationMutation } from '@/redux/features/auth/authApi';
import React, { FC, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

type Props = {
    setRoute: (route: string) => void;
    onClose: () => void; // Added onClose prop to handle closing the modal
};

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};

const Verification: FC<Props> = ({ setRoute, onClose }) => {
    const {token} = useSelector((state:any)=>state.auth)
    const [activation,{isSuccess,error}]=useActivationMutation()

    const [invalidError, setInvalidError] = useState(false);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: ""
    });

    useEffect(()=>{
        if(isSuccess){
            toast.success("Account activated successfully")
            setRoute("Login")
        }
        if(error){
            if("data" in error){
                const errorData = error as any
                toast.error(errorData.data.message)
                setInvalidError(true)
            }
            else{
                console.log('An error occured',error);
                
            }
        }
    },[isSuccess,error])

    const verificationHandler = async () => {
        const verificationNumber = await Object.values(verifyNumber).join("")
        if(verificationNumber.length!==4){
            setInvalidError(true)
            return
        }
        await activation({
            activation_token:token,
            activation_code:verificationNumber
        })

    };

    const handleInputChange = async (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index.toString()]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={onClose}>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <button
                    className="absolute top-2 right-2 text-gray-500 focus:outline-none"
                    onClick={onClose} // Close button
                >
                    &#10005;
                </button>
                <div className="text-center mb-6">
                    <div className="text-4xl text-blue-500 mb-4">
                        <VscWorkspaceTrusted />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Verify your account</h1>
                </div>
                <div className="flex justify-center mb-6">
                    {[0,1,2,3].map((index) => (
                        <input
                            key={index}
                            type="number"
                            ref={inputRefs[index]}
                            maxLength={1}
                            value={verifyNumber[index.toString() as keyof VerifyNumber]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="w-12 h-12 mx-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <div className="flex justify-center mb-6">
                    <button
                        onClick={verificationHandler}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Verify OTP
                    </button>
                </div>
                <div className="text-center">
                    <h5 className="text-gray-700">Go back to sign in?{' '}
                        <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setRoute("Login")}>
                            Login
                        </span>
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Verification;
