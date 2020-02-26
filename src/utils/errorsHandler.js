export const errorsHandler = (error) => {
    console.log(error)
    if (error) {
    if (error && error.message === 'INVALID_PASSWORD') {
      let errorMsg = 'Неверный парол'
      return errorMsg
    }
    if (error && error.message === 'INVALID_EMAIL') {
      let errorMsg = 'Ошибка, неверный email. Попробуйте снова'
      return errorMsg
    }
    
    if (error && error.message === 'EMAIL_EXISTS') {
      let errorMsg = 'Ошибка, email уже существует. Попробуйте другой'
      return errorMsg
    }
    if (error  && error.message === 'EMAIL_NOT_FOUND') {
      let errorMsg = 'Ошибка, учетной записи с таким email не существует. Попробуйте другой'
      return errorMsg
    }
    if (error  && error.message === 'WEAK_PASSWORD : Password should be at least 6 characters') {
      let errorMsg = 'Ошибка, ненадежный пароль.Пароль должен состоять минимум из 6 символов'
      return errorMsg
    }
    }
    
}