import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Header } from '../Header';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/orderApi';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
    id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {

    const [route, setRoute] = useState("login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    
    
    const { data: config } = useGetStripePublishableKeyQuery({});
    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');
    // console.log(config); 
    

    useEffect(() => {
        if (config) {
            const publishableKey = config?.publishableKey;
            setStripePromise(loadStripe(publishableKey));
        }
        if (data) { //course data
            const amount = Math.round(data.course.price);
            createPaymentIntent(amount);
        }
    }, [config, data]);

    useEffect(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData?.client_secret);
        }
    }, [paymentIntentData]);
    
    

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Header
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    {stripePromise && (
                        <CourseDetails 
                            data={data.course} 
                            stripePromise={stripePromise} 
                            clientSecret={clientSecret} 
                            setOpen={setOpen}
                            setRoute={setRoute}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default CourseDetailsPage;
