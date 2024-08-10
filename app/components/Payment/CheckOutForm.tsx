import React, { FC, useEffect, useState } from 'react';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCreateOrderMutation } from '@/redux/features/orders/orderApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
import socketIO from 'socket.io-client';
import { redirect } from 'next/navigation';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckOutForm: FC<Props> = ({ setOpen, data, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>('');
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true); // Payment processing starts
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment Successful');
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      // socketId.emit('notification', {
      //   title: 'New Order',
      //   message: `You have a new order from ${data.course.name}`,
      //   userId: user._id,
      // });
      redirect(`/course-access/${data._id}`)
      // Redirect to a specific route or do additional actions if needed
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error, data]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-6 p-4 border rounded-lg shadow-lg bg-white"
    >
      <div className="mb-4">
        <LinkAuthenticationElement id="link-authentication-element" className='hidden'/> 
        <PaymentElement id="payment-element" className="border rounded p-2" />
      </div>
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        <span id="button-text">{isLoading ? 'Processing...' : 'Pay now'}</span>
      </button>
      {message && <div id="payment-message" className="text-green-500 mt-2">{message}</div>}
    </form>
  );
};

export default CheckOutForm;
