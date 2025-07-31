import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './baseUrl';
import { message } from 'antd';
import { AuthContext } from '../contexts/AuthContext';

const useRegister = () => {
    const { setToken, updateProfile } = useContext(AuthContext);
    const [error, setError] = useState();
    const [errMsg, setErrMsg] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (url, inputData) => {
        setLoading(true);
        try {
            const res = await axios.post(url, inputData);
            if (res.status === 200) {
                setError();
                setLoading(false);
                setToken(res.data.data.token); // Use context setToken
                updateProfile(res.data.data.user); // Update profile in context
                navigate('/?type=all');
                message.success('Registered Successfully.');
                return res.data.data.user;
            }
        } catch (e) {
            setLoading(false);
            setError(e.response.data.errors);
            setErrMsg(e.response.data.message);
            return;
        }
        return null;
    };

    return { register, error, errMsg, loading };
};

export default useRegister;
