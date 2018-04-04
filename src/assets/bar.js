import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(/*{
      labels: ['Algorithms', 'Data Structures', 'Problem Solving'],
      datasets: [
        {
          label: 'User Info',
          backgroundColor: '#f87979',
          data: [0,0,0]
        }
      ]
    }*/this.data,this.options)
  }
}
