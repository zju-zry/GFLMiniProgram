import {View} from '@tarojs/components'
import Taro, {useDidShow} from '@tarojs/taro'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'
import {useContext, useEffect, useState} from 'react'
import fetch from '@/utils/request'
import {file_url} from '@/config'
import {TabIndexContext} from '../../store/tabIndex'

const Item = ({src, children, id}) => {

    return (
        <View
            className='item'
            style={{
                background: `url(${src}) no-repeat center`,
                backgroundSize: 'cover'
            }}
            onClick={() => Taro.navigateTo({url: `/pages/category/details/id=${id}`})}>
            {children}
        </View>
    )
}

const index = () => {

    const {tabIndex, dispatch} = useContext(TabIndexContext)
    useDidShow(() => {
        dispatch({type: 'change', payload: 'category'})
    })

    const [list, setList] = useState([])
    useEffect(async () => {
        let res = await fetch(
            {url: '/v1/admin/category/list?page=1&limit=5', method: 'get'}
        )
        if (res instanceof Error) 
            return
        setList(res.list)
    }, [])

    return (
        <View className='category'>
            {
                list.map(({id, file, name}) =>< Item key = {id} src = {file_url + file} id = {id} > {name}</Item>)
            }
        </View>
    )
}

export default index
