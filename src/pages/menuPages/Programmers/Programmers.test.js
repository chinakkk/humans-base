import {render,screen,fireEvent} from '@testing-library/react'
import Programmers from "./Programmers";
import axios from "axios";


jest.mock('axios')
describe('Users test', function () {
  let response
  beforeEach(() => {
    response = {
      data:[
          {
            "level": "Middle",
            "uid": "33a1d3563b2",
            "surname": "Gum",
            "about": "",
            "birthday": "11111",
            "login": "ilnar",
            "password": "ilnar",
            "name": "Ilnar",
            "imageURL": ""
          },
          {
            "about": "Здесь могла быть ваша реклама",
            "level": "Middle",
            "name": "Alisher",
            "uid": "3c09e484965",
            "imageURL": "",
            "password": "alisher",
            "login": "alisher",
            "birthday": "22.03.1996",
            "surname": "Boshanov"
          }
      ]
    }
  })

  test('Get Users',async() => {
    axios.get.mockReturnValue(response)
    render(<Programmers/>)
    const users = await screen.findAllByTestId('userTestId')
    expect(users.length).toBe(2)
    expect(axios.get).toBeCalledTimes(1)
    screen.debug()

  })
});