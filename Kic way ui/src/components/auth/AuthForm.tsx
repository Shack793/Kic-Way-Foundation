import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  address: z.string().min(5, "Address must be at least 5 characters").max(100),
  city: z.string().min(2, "City must be at least 2 characters").max(50),
  state: z.string().min(2, "State must be at least 2 characters").max(50),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters").max(10),
  telephone: z.string().min(10, "Telephone must be at least 10 characters").max(15),
  email: z.string().email("Please enter a valid email"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      telephone: '',
      email: '',
      website: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await api.post(endpoint, {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        telephone: data.telephone,
        email: data.email,
        website: data.website || null,
        password: data.password
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Set success message
      setSuccess(isLogin ? 'Login successful!' : 'Registration successful!');

      // Reset form after successful submission
      if (!isLogin) {
        reset();
      }
      
      // Add redirect after successful login/registration
      setTimeout(() => {
        if (response.data.user && response.data.user.is_admin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#006839]">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <Input
                  type="text"
                  placeholder="Name"
                  {...register('name')}
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Address"
                  {...register('address')}
                  className="w-full"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="City"
                  {...register('city')}
                  className="w-full"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message as string}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="State"
                  {...register('state')}
                  className="w-full"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state.message as string}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Zip Code"
                  {...register('zipCode')}
                  className="w-full"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode.message as string}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Telephone"
                  {...register('telephone')}
                  className="w-full"
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm mt-1">{errors.telephone.message as string}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Website (optional)"
                  {...register('website')}
                  className="w-full"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website.message as string}</p>
                )}
              </div>
            </>
          )}

          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register('password')}
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                className="w-full"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>
              )}
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#006839]"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              if (isLogin) {
                // If in login mode, switch to register
                setIsLogin(false);
              } else {
                // If in register mode, close this modal and open login modal
                const modal = document.querySelector('[data-register-modal]');
                if (modal) {
                  modal.remove();
                }
                // Find and click the login button on the page
                document.querySelector('[data-login-button]')?.click();
              }
              setError('');
              setSuccess('');
              reset();
            }}
            className="text-[#006839] hover:underline"
            type="button"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};






