/* eslint-disable no-alert */
/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Context from '../components/Context';
import ModalWindowItem from '../components/ModalWindowItem';
import Icons from '../img/MinHeaderIcon';
import api, { setupApi, imgApi } from '../api/api';

const CartContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.8);
  z-index: 3;
`;

const Container = styled.div`
  position: fixed;
  background: #ffffff;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 7px;
  overflow: overlay;
  display: flex;
  flex-direction: row;
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-image: url(/images/Store-bg.png);
  width: 210px;
  h5 {
    font-weight: 600;
    font-size: 28px;
    line-height: 140%;
    color: #ffffff;
    text-align: center;
  }
  button {
    /*  ПРАВИТЬ */
    background: none;
    border: none;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      position: relative;
      width: 210px;
      height: 55px;
      background: #333333;
      color: #ffffff;
      font-size: 24px;
      box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 1) inset;
      text-indent: 10px;
      border: none;
      border-radius: 2px;
      margin-bottom: 60px;
      ::placeholder {
        font-size: 22px;
      }
      :focus::placeholder {
        position: absolute;
        font-size: 15px;
        top: 2px;
        left: 5px;
        color: white;
      }
    }
    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
      color: #ffffff;
      text-align: center;
    }
    p {
      font-weight: 600;
      font-size: 28px;
      line-height: 150%;
      color: #ffffff;
      text-align: center;
      margin-bottom: 20px;
    }
  }
`;
const Purchase = styled.div`
  padding: 20px;
  width: 620px;
  height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  button {
    background: none;
    border: none;
  }
  h5 {
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    color: #333333;
    margin-bottom: 20px;
  }
`;
const Head = styled.div`
  margin-left: auto;
  margin-bottom: 10px;
  button {
    width: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
  }
`;

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 70px;
  justify-content: center;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin: 20px 0;
      text-align: center;
      font-style: bold;
      font-weight: 500;
      font-size: 25px;
      line-height: 140%;
      letter-spacing: 0.1em;
      color: #333333;
    }
    p {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 150%;
      color: red;
    }
    label {
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      color: #333333;
      display: flex;
      flex-direction: column;
      letter-spacing: 0.1em;

      input {
        border: 1px solid #d6d6d6;
        margin-bottom: 20px;
        width: 250px;
        height: 45px;
        padding-left: 15px;
      }
    }
  }
  div {
    margin-top: 15px;
    button {
      background: none;
    }
    label {
      display: flex;
      flex-direction: row;
      align-items: center;
      input {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
`;
const AddForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 70px;
  width: 500px;
  height: 600px;
  justify-content: space-between;
  input {
    border: 1px solid #d6d6d6;
    height: 45px;
    width: 470px;
    padding-left: 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  label {
    position: relative;
    cursor: pointer;
    :after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background: transparent;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    input {
      opacity: 0;
      display: none;
    }
  }
  div {
    display: flex;
    align-items: center;
    width: 200px;
    height: 200px;
    border: 1px solid #d6d6d6;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      z-index: -100;
      position: absolute;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(51, 51, 51, 0.5);
      text-align: center;
    }
  }
`;

export default function ModalWindow({ ...props }) {
  const modalWindowContext = React.useContext(Context);

  const [image, setImage] = React.useState(null);
  const [isNewUser, setIsNewUser] = React.useState(false);
  


  
  const { replace } = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      const endpoint = isNewUser ? 'signup' : 'signin';
      api
        .post(`/users/${endpoint}`, values)

        .then(({ data: { token, token_expires } = {} }) => {
          window.sessionStorage.token = token;
          window.sessionStorage.tokenExpires =
            Date.now() + token_expires * 1000;
          modalWindowContext.setLoginStatus(token && token_expires);
          setupApi(token);
          replace(`/products`);
        })
        .catch(err => {
          alert(err.message);
        });

      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: yup.object({
      email: yup.string().email('Некорректный e-mail'),
      password: yup.string().required('Введите пароль'),
    }),
  });

  const ref = React.useRef({
    label: '',
    producer: '',
    price: '',
  });

  const createCard = async () => {
    props.closingAddForm()
    const form = new FormData();
    form.append('image', image);
    const { data: newCardResponse } = await api.post(
      '/jewellery/',
      ref.current
    );
    const { data } = await imgApi.post(
      '/images?resource=fh-jewellery&id=123/',
      form
    );

    const { data: summaryСard } = await api.put(`/jewellery/${newCardResponse.id}`, {
      ...newCardResponse,
      src: data,
    });

    modalWindowContext.setItems(prev => [...prev, summaryСard]);

  };



  if (props.liked) {
    return (
      <CartContainer>
        <Container>
          <Purchase>
            <button type="button" onClick={props.closedLiked}>
              <Icons name="Delete" width="30" height="30" color="#333333" />
            </button>
            <h5>Вам понравилось</h5>
            <Head>
              <button type="button" onClick={modalWindowContext.clearLiked}>
                <p>Очистить</p>
                <Icons name="Unliked" width="20" height="20" color="red" />
              </button>
            </Head>
            {modalWindowContext.favoriteItems.map((obj, i) => (
              <ModalWindowItem
                liked
                removeItem={() => modalWindowContext.reverseFavoriteItems(obj)}
                {...obj}
                // eslint-disable-next-line react/no-array-index-key
                key={i}
              />
            ))}
          </Purchase>
        </Container>
      </CartContainer>
    );
  }
  if (props.cart) {
    return (
      <CartContainer>
        <Container>
          <Purchase>
            <h5>Ваши покупки</h5>
            <Head>
              <button type="button" onClick={modalWindowContext.clearCart}>
                <p>Очистить</p>
                <Icons name="Delete" width="20" height="20" color="red" />
              </button>
            </Head>
            {modalWindowContext.cartItems.map((obj, i) => (
              <ModalWindowItem
                removeItem={() => modalWindowContext.reverseCartItems(obj)}
                {...obj}
                // eslint-disable-next-line react/no-array-index-key
                key={i}
              />
            ))}
          </Purchase>
          <OrderDetails>
            <div>
              <button type="button" onClick={props.closedCart}>
                <Icons name="Delete" width="30" height="30" color="#FFFFFF" />
              </button>
              <h5>Детали заказа</h5>
            </div>
            <div>
              <input type="text" placeholder="Введите промокод" />
              <span>Итого:</span>
              <p>{modalWindowContext.price} ₽</p>
              <Button>Заказать</Button>
            </div>
          </OrderDetails>
        </Container>
      </CartContainer>
    );
  }
  if (props.login) {
    return (
      <CartContainer>
        <Container>
          <LoginForm>
            <div>
              <button type="button" onClick={props.closedLogin}>
                <Icons name="Delete" width="30" height="30" color="#333333" />
              </button>
            </div>
            <form>
              <span>{isNewUser ? 'Регистрация' : 'Вход'}</span>
              <label htmlFor="email">
                E-mail:
                <input
                  placeholder="Введите e-mail"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </label>
              {formik.touched.email && formik.errors.email && (
                <p>{formik.errors.email}</p>
              )}
              <label htmlFor="password">
                Пароль:
                <input
                  placeholder="Введите пароль"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password || ''}
                  autoComplete="true"
                />
              </label>
              {formik.touched.password && formik.errors.password && (
                <p>{formik.errors.password}</p>
              )}
              <Button
                dark
                type="submit"
                disabled={!formik.isValid && !formik.dirty}
                onClick={() => {
                  formik.handleSubmit();
                  props.closedLogin();
                }}
              >
                Отправить
              </Button>
            </form>
            <div>
              <label htmlFor="regCheckbox">
                <input
                  id="regCheckbox"
                  type="checkbox"
                  name="name"
                  checked={isNewUser}
                  onChange={() => setIsNewUser(!isNewUser)}
                />
                Регистрация
              </label>
            </div>
          </LoginForm>
        </Container>
      </CartContainer>
    );
  }
  if (props.addForm) {
    return (
      <CartContainer>
        <Container>
          <AddForm>
            <button type="button" onClick={() =>{ props.closingAddForm(); modalWindowContext.setEditStatus(false)}}>
              <Icons name="Delete" width="30" height="30" color="#333333" />
            </button>

            <input
              type="text"
              name="label"
              // value={props.editedValue.label}
              onChange={event => {
                ref.current.label = event.target.value;
              }}
              placeholder="Введитеде тип товара"
            />
            <input
              type="text"
              name="producer"
              // value={props.editedValue.producer}
              onChange={event => {
                ref.current.producer = event.target.value;
              }}
              placeholder="Введите производителя и модель"
            />
            <input
              type="number"
              name="price"
              // value={props.editedValue.price}
              onChange={event => {
                ref.current.price = Number(event.target.value);
              }}
              placeholder="Установите стоимость"
            />
            <div>

              {image && (
                <img alt="not fount" src={URL.createObjectURL(image)} />
              )}


              <span>Выберите изображение</span>
            </div>
            <label htmlFor="fileInput">
              <input
                id="fileInput"
                onChange={event => {
                  setImage(event.target.files[0]);
                }}
                type="file"
                name="file"
              />
              <Button dark>Выбрать изображение</Button>
            </label>
            <Button



onClick ={modalWindowContext.editStatus ?  console.log('traTATA') : () => createCard()}




            dark>
              Разместить товар
            </Button>
          </AddForm>
        </Container>
      </CartContainer>
    );
  }
}
