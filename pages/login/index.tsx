import React from 'react'
import styles from "./index.module.scss";
import { Formik } from 'formik';
import * as Yup from "yup";
import Cookies from "universal-cookie";
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const cookies = new Cookies();

interface Response {
  accessToken: string;
  status: boolean
}
const Login = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email()
          .required("Lütfen geçerli e-mail adresi giriniz."), password: Yup.string().required("Lütfen şifrenizi giriniz."),
      })}
      onSubmit={(values) => {
        fetch("https://e-undefined-service.onrender.com/auth/login", {
          method: "POST",
          body: JSON.stringify({ mail: values.email, password: values.password }),
          headers: { "Content-Type": "application/json" }
        }).then(async (data) => {
          const aaa: Response = await data.json()
          return aaa;
        }).then((response) => {
          console.log("response::", response)
          if (response.status === true) {
            cookies.set("accessToken", response.accessToken)
            message.open({
              type: 'success',
              content: 'Giriş başarılı',
            });
            router.replace("/")
            // history silinmesine rağmen geri dönebiliyor bakılacak..
            // login redirect olduğunda hata var bakılacak
          }
          else {
            message.open({
              type: 'warning',
              content: 'Giriş başarısız',
            });
          }
        }).catch((response) => {
          console.log("response !catch", response)
          message.open({
            type: 'warning',
            content: 'Giriş başarısız',
          });
        })
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
      }) => (
        <div className={styles.loginContainer}>
          <div className={styles.loginWrapper}>
            <div className={styles.loginText}>GİRİŞ YAP</div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              {errors.email && touched.email && (
                <div className={styles.loginErrors}>{errors.email}</div>
              )}
              <label htmlFor="email"></label>
              <input
                className={styles.mail}
                id="email"
                type="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
              />
              {errors.password && touched.password && (
                <div className={styles.loginErrors}>{errors.password}</div>
              )}
              <label htmlFor="password"></label>
              <input
                className={styles.password}
                id="password"
                type="password"
                placeholder="Şifre"
                value={values.password}
                onChange={handleChange}
              />
              <button type="submit"
                disabled={isSubmitting}
                className={styles.loginBtn}>GİRİŞ YAP</button>
            </form>
            <div className={styles.accountInfo}> Hesabınız yok mu?
              <span className={styles.registerRedirect}>Kayıt ol</span>
            </div>
            <div className={styles.loginInfoContainer}>
              <div className={styles.loginInfo}>E-ticaret altyapımızı size daha iyi bir deneyim sunmak için yeniledik! </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Login