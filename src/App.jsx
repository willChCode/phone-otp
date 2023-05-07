import { BsFillShieldLockFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase.config';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: response => {
            onSignup();
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        },
        auth
      );
    }
  };

  const onSignup = () => {
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPath = '+' + phone;
    signInWithPhoneNumber(auth, formatPath, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success('OTP sended sucessfully');
        // ...
      })
      .catch(error => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  const onOTPVerify = () => {
    confirmationResult
      .confirm(otp)
      .then(async res => {
        console.log(res);
        setUser(res.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(user);

  return (
    <section className=' flex justify-center items-center h-screen'>
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id='recaptcha-container'></div>
        {user ? (
          <div className='w-80 flex flex-col gap-4 shadow-md p-[1.5rem]'>
            <h2 className='text-center text-black text-xl font-bold'>
              Login Sucess
            </h2>
            <section className='flex flex-col items-centers justify-center'>
              <h2 className='fot-bold'>TOKEN :</h2>
              <p className='w-80'>{user.accessToken}</p>
            </section>
          </div>
        ) : (
          <div className='w-80 flex flex-col gap-4 shadow-md p-[1.5rem]'>
            <h1 className='font-bold text-center p-2 text-lg'>
              Welcome to OTP
            </h1>

            {showOTP ? (
              <>
                <span className='m-auto text-black'>
                  <BsFillShieldLockFill size={25} />
                </span>
                <label htmlFor='' className='font-bold'>
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  className='otp-container'
                  OTPLength={6}
                  otpType='number'
                  disabled={false}
                  autoFocus></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className='bg-red-500 rounded-mdfont-bold text-white py-1 cursor-pointer flex justify-center'>
                  <CgSpinner size={20} className='mt-1' />
                  <span>Verify</span>
                </button>
              </>
            ) : (
              <>
                <label
                  htmlFor=''
                  className='font-semibold text-black text-center'>
                  Enter your number phone
                </label>
                <PhoneInput country={'us'} value={phone} onChange={setPhone} />
                <button
                  onClick={onSignup}
                  className='bg-red-500 rounded-md font-bold py-1 cursor-pointer flex justify-center'>
                  <span className='font-bold'>Send code SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
