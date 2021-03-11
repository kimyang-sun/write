import * as yup from 'yup';

// Yup으로 유효성 검사
export const loginValidation = yup.object({
  email: yup
    .string()
    .email('이메일 형식이 아닙니다.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(4, '비밀번호는 4자리 이상이어야 합니다.'),
});

export const signUpValidation = yup.object({
  email: yup
    .string()
    .email('이메일 형식이 아닙니다.')
    .required('이메일을 입력해주세요.'),
  nickname: yup
    .string()
    .required('닉네임을 입력해주세요.')
    .max(12, '닉네임은 12자리 이하여야 합니다.')
    .min(2, '닉네임은 2자리 이상이어야 합니다.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(4, '비밀번호는 4자리 이상이어야 합니다.'),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
  term: yup.boolean().oneOf([true], '약관에 동의해주세요.'),
});
