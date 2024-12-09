import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function ChangePassword() {
    const {admin} = useAuth();
    const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { changePassword } = useAuth();
  const submit = passwords => {
    changePassword(passwords);
  };

  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit(submit)}>
        {admin.isAdmin && <Input
          type="password"
          label="Current Password"
          {...register('currentPassword', {
            required: true,
          })}
          error={errors.currentPassword}
        />}

        <Input
          type="password"
          label="New Password"
          {...register('newPassword', {
            required: true,
            minLength: 5,
          })}
          error={errors.newPassword}
        />

        <Input
          type="password"
          label="Confirm Password"
          {...register('confirmNewPassword', {
            required: true,
            validate: value =>
              value != getValues('newPassword')
                ? 'Passwords Do No Match'
                : true,
          })}
          error={errors.confirmNewPassword}
        />

        <Button type="submit" text="Change" />
      </form>
    </div>
  );
}