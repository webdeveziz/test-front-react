// import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import styles from './lists.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, setDirections } from '../store/slices/directions'
import { setCoins, setSecondCat } from '../store/slices/coins'
import { setFilters, setToCoins } from '../store/slices/filters'
import arrow from '../assets/img/icon.png'
import clsx from 'clsx'

const Lists = () => {
  const [categories, setCategories] = useState([
    { activ: true, name: 'Все' },
    { activ: false, name: 'Криптовалюты' },
    { activ: false, name: 'Наличные' },
    { activ: false, name: 'Банки RUB' },
    { activ: false, name: 'Банки UAH' },
  ])
  const [categoriesSecond, setCategoriesSecond] = useState([
    { activ: true, name: 'Все' },
    { activ: false, name: 'Криптовалюты' },
    { activ: false, name: 'Наличные' },
    { activ: false, name: 'Банки RUB' },
    { activ: false, name: 'Банки UAH' },
  ])

  const [isOnFrom, setIsOnFrom] = useState(false)
  const [isOnTo, setIsOnTo] = useState(false)

  const [selectedCoin, setSelectedCoin] = useState('---')
  const [selectedCoinInTo, setSelectedCoinInTo] = useState('---')

  const spanRef = useRef()
  const btcRef = useRef()
  const ethRef = useRef()
  const span2Ref = useRef()

  const directions = useSelector((state) => state.directions.directions)
  const coins = useSelector((state) => state.coins.coins)
  const filteredCoins = useSelector((state) => state.filters.filteredCoins)

  const dispatch = useDispatch()

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !e.path.includes(spanRef.current) &&
        !e.path.includes(btcRef.current) &&
        !e.path.includes(span2Ref.current) &&
        !e.path.includes(ethRef.current)
      ) {
        setIsOnFrom(false)
        setIsOnTo(false)
      }
    }
    document.body.addEventListener('click', handleClick)
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    dispatch(setCoins(filteredCoins))
  }, [filteredCoins])

  useEffect(() => {
    dispatch(setDirections())
    dispatch(setFilters())
  }, [])

  useEffect(() => {
    if (directions.length > 0) setSelectedCoin(directions[0]?.code.slice(0, 4))
  }, [directions])

  useEffect(() => {
    if (filteredCoins.length > 0)
      setSelectedCoinInTo(filteredCoins[0]?.code.slice(0, 4))
  }, [filteredCoins, categories, directions])

  const handleToggleFrom = () => {
    setIsOnFrom((prev) => !prev)
  }
  const handleToggleTo = () => {
    setIsOnTo((prev) => !prev)
  }

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin.slice(0, 5))
    setIsOnFrom((prev) => !prev)
    dispatch(setToCoins(coin))
    setIsOnTo(false)
    dispatch(setCoins(filteredCoins))
  }

  const handleSelectCoinTo = (coin) => {
    setSelectedCoinInTo(coin.slice(0, 4))
    setIsOnTo((prev) => !prev)
  }

  const selectCat = (cat) => {
    dispatch(selectCategories(cat))
    // setSelectedCoinInTo(filteredCoins[0]?.code.slice(0, 4))
    setIsOnTo(false)
    setIsOnFrom(false)

    setCategories((prev) =>
      prev.map((elem) => {
        if (elem.name === cat) {
          return { ...elem, activ: true }
        } else {
          return { ...elem, activ: false }
        }
      }),
    )
  }

  const handleSelectSecondCat = (cat) => {
    dispatch(setSecondCat(filteredCoins, cat))
    setCategoriesSecond((prev) =>
      prev.map((elem) => {
        if (elem.name === cat) {
          return { ...elem, activ: true }
        } else {
          return { ...elem, activ: false }
        }
      }),
    )
  }

  return (
    <div className={styles.lists}>
      <div className={styles.lists_from}>
        <h3>Отдаете</h3>
        <ul>
          {categories.map((cat) => (
            <li
              className={clsx(cat.activ && styles.active)}
              onClick={() => selectCat(cat.name)}
              key={cat.name}
            >
              {cat.name}
            </li>
          ))}
        </ul>
        <div className={styles.lists_from__input}>
          <input type="text" />
          <span className={styles.coin}>
            <b onClick={handleToggleFrom} ref={btcRef}>
              {selectedCoin}
            </b>
            {isOnFrom && (
              <span ref={spanRef} className={styles.isOn}>
                {directions.map((item) => {
                  return (
                    <li
                      key={item.code}
                      onClick={() => handleSelectCoin(item.code)}
                    >
                      {item.name}
                    </li>
                  )
                })}
              </span>
            )}
          </span>
        </div>
      </div>
      <div className={styles.lists_average}>
        <img src={arrow} />
      </div>
      {/* -------------------------------------------------- */}
      <div className={styles.lists_to}>
        <h3>Получаете</h3>
        <ul>
          {categoriesSecond.map((cat) => (
            <li
              className={clsx(cat.activ && styles.active)}
              key={cat.name}
              onClick={() => handleSelectSecondCat(cat.name)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
        <div className={styles.lists_from__input}>
          <input type="text" />
          <span className={styles.coin}>
            <b ref={ethRef} onClick={handleToggleTo}>
              {selectedCoinInTo}
            </b>
            {isOnTo && (
              <span ref={span2Ref} className={styles.isOn}>
                {coins.map((item) => {
                  return (
                    <li
                      key={item.code}
                      onClick={() => handleSelectCoinTo(item.code)}
                    >
                      {item.code}
                    </li>
                  )
                })}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Lists
