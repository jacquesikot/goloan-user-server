interface IUser {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    gender: 'male' | 'female';
    bvn: string;
    user_type: string;
}

export default IUser;
