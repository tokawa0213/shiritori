// Datas
var names = Object.keys(zukan)
var app = new Vue({
    el: '#app',
    data: {
      entered_answer : "",
      answered_names : ["アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ".charAt(Math.round( Math.random()*43))],
      past_answers : ""
    },
    methods: {
      enter_answer : function(){
        this.answered_names.push(this.entered_answer)
        this.past_answers = '\
        <div class="columns">\
          <div class="column">\
            <div class="box has-background-success">\
                <article class="media">\
                    <div class="media-left">\
                        <figure class="image is-96x96">\
                            <img src="' +
                            zukan[this.entered_answer]["image"]
                            +'"></figure>\
                    </div>\
                    <div class="media-content has-text-centered">\
                        <div class="content">\
                            <div class="title is-8">'+
                            this.entered_answer
                            +'</div>\
                        </div>\
                    </div>\
                </article>\
            </div>\
          </div>\
        </div>'
        + this.past_answers
        this.entered_answer = ""
      }
    },
    computed:{
      calculate_score : function(){
        return this.answered_names.length * 100 - 100
      },
      next_staring_word : function(){
        return this.answered_names[this.answered_names.length-1].slice(-1)
      },
      is_valid_answer : function(){
        if((this.answered_names.indexOf(this.entered_answer) == -1) && (names.indexOf(this.entered_answer) != -1) && (this.entered_answer[0] == this.answered_names[this.answered_names.length-1].slice(-1))){
          return true
        }else{
          return false
        }
      }
    }
})