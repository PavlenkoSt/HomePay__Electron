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
  doubles?: boolean
}

const Input: FC<InputPropsType> = ({
  value,
  setValue,
  label,
  error,
  errorMessage,
  type,
  doubles,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  return (
    <div className={classnames(styles.container, !!doubles && styles.doubles)}>
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
        className={classnames(
          styles.label,
          doubles && styles.labelDouble,
          (isFocused || value || value === 0) && styles.activeLabel
        )}
      >
        {label}:
      </span>
      {error && (
        <div className={classnames(styles.control, doubles && styles.controlDoubles)}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default Input
