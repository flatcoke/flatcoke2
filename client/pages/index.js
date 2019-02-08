import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/styles.scss'
import Button from '@material-ui/core/Button'
import Layout from 'components/Layout'

const cx = classNames.bind(styles)

export default () => (
  <Layout title="FLATCOKE">
    <div className={cx('example')}>
      <Button color="primary">This is a button</Button>
      <ul>
        <li>TaeminKim</li>
        <li>This is FLATCOKE page</li>
        <li>This is personal blog</li>
      </ul>
    </div>
  </Layout>
)
