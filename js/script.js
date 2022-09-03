let url = 'http://localhost:3001'
let employees = document.querySelector('.employees')
let form = document.forms.form
let search = document.querySelector('#search')
let inpGetPromotion = document.querySelector('#inpGetPromotion')
let all = document.querySelector('#all')
let salary = document.querySelector('#salary')

function getData() {
   axios.get(url + '/data')
      .then(res => {
         if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            reload(res.data)
         }
      })
}

function getPromotion(params) {
   axios.get(url + '/promotion')
      .then(res => {
         if (res.status === 200 || res.status === 201) {
            reload(res.data)
         }
      })
}

function getDataSalary(item) {
   axios.get(url + '/salary')
      .then(res => {
         if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            reload(res.data)
         }
      })
      .catch(err => console.log(err))
}

function getData_promotion(item) {
   axios.post(url + '/salary', item)
      .then(res => {
         if (res.status === 200 || res.status === 201) {
            console.log(res.data);
         }
      })
      .catch(err => console.log(err))
}

function deleteData(id) {
   axios.delete(url + '/data/' + id)
      .then(res => {
         if (res.status === 200 || res.status === 201) {
            getData()
         }
      })
      .catch(err => console.log(err))
}

function searchFilter(params) {
   axios.get(url + '/data')
      .then(res => {
         if (res.status === 200 || res.status === 201) {
            let newArr = res.data.filter(item => {
               let name = item.name.toLowerCase()
               let value = search.value.toLowerCase().trim()
               if (name.includes(value)) {
                  return item
               }
            })
            reload(newArr)
         }
      })
}

getData()

form.onsubmit = (e) => {
   e.preventDefault()

   let employee = {}

   let fm = new FormData(form)
   fm.forEach((value, key) => {
      employee[key] = value
   })

   axios.post(url + '/data', employee)
      .then(res => {
         if (res.status === 200 || res.status === 201) {
            getData()
         }
      })

   form.reset()
}

function reload(arr) {
   employees.innerHTML = ''

   for (let item of arr) {
      let employee = document.createElement('div')
      let name = document.createElement('div')
      let span_name = document.createElement('span')
      let salary = document.createElement('div')
      let span_salary = document.createElement('span')
      let control = document.createElement('div')
      let promotion = document.createElement('div')
      let promotion_img = document.createElement('img')
      let del = document.createElement('div')
      let del_img = document.createElement('img')

      employee.classList.add('employee')
      name.classList.add('name')
      salary.classList.add('salary')
      control.classList.add('control')
      promotion.classList.add('promotion')
      del.classList.add('delete')
      del_img.classList.add('img')
      promotion_img.classList.add('img')

      span_name.innerHTML = item.name
      span_salary.innerHTML = `${item.salary} $`
      promotion_img.src = 'https://cdn1.iconfinder.com/data/icons/food-volume-ii/64/zcookie-128.png'
      del_img.src = 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-128.png'

      employees.append(employee)
      employee.append(name, salary, control)
      name.append(span_name)
      salary.append(span_salary)
      control.append(promotion, del)
      promotion.append(promotion_img)
      del.append(del_img)

      del.onclick = () => {
         deleteData(item.id)
      }

      employee.onclick = () => {
         getData_promotion(item)
      }
   }
}

search.onkeyup = () => {
   searchFilter()
}

inpGetPromotion.onclick = () => {
   getPromotion()
}

all.onclick = () => {
   getData()
}

salary.onclick = () => {
   getDataSalary()
}