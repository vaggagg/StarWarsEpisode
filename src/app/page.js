'use client'
import Input from './components/Input/Input'
import MainList from './components/MainList/MainList'
import SelectedList from './components/SelectedList/SelectedList'
import Provider from './context/Provider'

export default function Home() {

  return (

    <div className='main-page-container'>

      <div className='center-container'>

        <div className='container'>

          <Provider>

            <Input />

            <div className='episode-container'>

              <MainList />

              <SelectedList />
              
            </div>


          </Provider>

        </div>

      </div>

    </div>

  )

}
