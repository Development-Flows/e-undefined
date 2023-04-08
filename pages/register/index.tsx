import styles from "./index.module.scss";
import {Formik} from 'formik';
import * as Yup from "yup";
import Cookies from "universal-cookie";
import {message} from 'antd';
import Link from "next/link";
import {useRouter} from 'next/navigation';

const cookies = new Cookies();


interface Response {
    accessToken?: string;
    status: boolean;
    errorMessage?: string;
    data?: object;
}

interface data {
    firstName: string;
    isActive: boolean;
    lastName: string;
    mail: string;
    password: string;
    _v?: number;
    _id: number;
    status: boolean
}


const Register = () => {
    const router = useRouter();
    return (
        <Formik
            initialValues={{
                name: "",
                surname: "",
                email: "",
                password: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("İsim giriniz"),
                surname: Yup.string().required("Soyisim giriniz."),
                email: Yup.string().email().required("Lütfen geçerli e-mail adresi giriniz."),
                password: Yup.string().required("Lütfen şifrenizi giriniz."),
            })}
            onSubmit={(values) => {
                fetch("https://e-undefined-service.onrender.com/auth/register", {
                    method: "POST",
                    body: JSON.stringify({
                        mail: values.email,
                        password: values.password,
                        firstName: values.name,
                        lastName: values.surname
                    }),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(async (data) => data.json()).then((response) => {
                    if (response.status === true && response?.data) {
                        message.open({
                            type: 'success',
                            content: 'Kayıt başarılı',
                        });
                        router.replace("/login");
                    } else if (response.status === false && response.errorMessage === "User already exist") {
                        message.open({
                            type: 'warning',
                            content: 'Hesabınız zaten var lütfen giriş yapınız.'
                        });
                    }
                }).catch((response) => {
                    console.log("response !catch", response)
                    if (response.status === false) {
                        message.open({
                            type: 'warning',
                            content: 'Kayıt Başarısız.'
                        });
                    }
                })
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  handleReset,
                  isSubmitting,
                  touched,
              }) => (
                <div className={styles.registerContainer}>
                    <div className={styles.registerWrapper}>
                        <div className={styles.registerTitle}>ÜYE OL</div>
                        <form onSubmit={handleSubmit} className={styles.registerForm}>
                            {errors.name && touched.name && (
                                <div className={styles.loginErrors}>{errors.name}</div>
                            )}
                            <label htmlFor="name"></label>
                            <input
                                className={styles.registerInput}
                                type="text"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Ad"
                            />
                            {errors.surname && touched.surname && (
                                <div className={styles.loginErrors}>{errors.surname}</div>
                            )}
                            <label htmlFor="surname"></label>
                            <input
                                className={styles.registerInput}
                                type="surname"
                                id="surname"
                                value={values.surname}
                                onChange={handleChange}
                                placeholder="Soyad"
                            />
                            {errors.email && touched.email && (
                                <div className={styles.loginErrors}>{errors.email}</div>
                            )}
                            <label htmlFor="email"></label>
                            <input
                                className={styles.registerInput}
                                type="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                            />
                            {errors.password && touched.password && (
                                <div className={styles.loginErrors}>{errors.password}</div>
                            )}
                            <label htmlFor="password"></label>
                            <input
                                className={styles.registerInput}
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Şifre"
                            />
                            <button type="submit" disabled={isSubmitting} className={styles.registerBtn}>ÜYE OL</button>
                            <div className={styles.shortInfo}>
                                <div className={styles.info}>Zaten hesabınız var mı?</div>
                                <Link href="/login">
                                    <div className={styles.infoTwo}>Üye Girişi</div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default Register