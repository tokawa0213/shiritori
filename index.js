// Datas
var names = Object.keys(zukan)

function find_true_next_word(word_list){
  var replacing_letters = {
    'ガ':['カ','ガ'],'ギ':['キ','ギ'],'グ':['ク','グ'],'ゲ':['ケ','ゲ'],'ゴ':['コ','ゴ'],
    'カ':['カ','ガ'],'キ':['キ','ギ'],'ク':['ク','グ'],'ケ':['ケ','ゲ'],'コ':['コ','ゴ'],
    'ザ':['サ','ザ'],'ジ':['シ','ジ'],'ズ':['ス','ズ'],'ゼ':['セ','ゼ'],'ゾ':['ソ','ゾ'],
    'サ':['サ','ザ'],'シ':['シ','ジ'],'ス':['ス','ズ'],'セ':['セ','ゼ'],'ソ':['ソ','ゾ'],
    'ダ':['タ','ダ'],'ヂ':['チ','ヂ'],'ヅ':['ツ','ヅ'],'デ':['テ','デ'],'ド':['ト','ド'],
    'タ':['タ','ダ'],'チ':['チ','ヂ'],'ツ':['ツ','ヅ'],'テ':['テ','デ'],'ト':['ト','ド'],
    'バ':['ハ','パ','バ'],'ビ':['ヒ','ピ','ビ'],'ブ':['フ','プ','ブ'],'ベ':['ヘ','ペ','ベ'],'ボ':['ホ','ポ','ボ'],
    'ハ':['ハ','パ','バ'],'ヒ':['ヒ','ピ','ビ'],'フ':['フ','プ','ブ'],'ヘ':['ヘ','ペ','ベ'],'ホ':['ホ','ポ','ボ'],
    'パ':['ハ','パ','バ'],'ピ':['ヒ','ピ','ビ'],'プ':['フ','プ','ブ'],'ペ':['ヘ','ペ','ベ'],'ポ':['ホ','ポ','ボ'],
    "ァ":["ア"],"ィ":["イ"],"ゥ":["ウ"],"ェ":["エ"],"ォ":["オ"],"ッ":["ツ"],"ャ":["ヤ"],"ュ":["ユ"],"ョ":["ヨ"]
  };
  if(word_list[word_list.length-1].slice(-1) == "ー"){
    word_list = word_list[word_list.length-1].substr(0,word_list[word_list.length-1].length-1)
  }
  if(Object.keys(replacing_letters).indexOf(word_list[word_list.length-1].slice(-1)) != -1){
    return replacing_letters[word_list[word_list.length-1].slice(-1)]
  }
  return [word_list[word_list.length-1].slice(-1)]
}

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
        next_word = find_true_next_word(this.answered_names)
        return next_word.join(",")
      },
      is_valid_answer : function(){
        if((this.answered_names.indexOf(this.entered_answer) == -1) && (names.indexOf(this.entered_answer) != -1) && (find_true_next_word(this.answered_names).indexOf(this.entered_answer[0]) != -1)){
          return true
        }else{
          return false
        }
      }
    }
})