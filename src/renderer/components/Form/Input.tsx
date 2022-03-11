import { Dispatch, FC, HTMLInputTypeAttribute, SetStateAction, useRef, useState } from 'react'
import classnames from 'classnames'

import styles from './Input.module.scss'

type InputPropsType = {
  value: string | number
  setValue: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>> | any
  label: string
  error?: boolean
  errorMessage?: string
  type?: HTMLInputTypeAttribute
}

const Input: FC<InputPropsType> = ({ value, setValue, label, error, errorMessage, type }) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value as any)}
        className={classnames(styles.input, error && styles.inputError)}
        type={type || 'text'}
      />
      <span
        //@ts-ignore
        onClick={() => inputRef.current.focus()}
        className={classnames(styles.label, (isFocused || value) && styles.activeLabel)}
      >
        {label}:
      </span>
      {error && <div className={styles.control}>{errorMessage}</div>}
    </div>
  )
}

export default Input
