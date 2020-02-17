//TODO: Implement computer player
//TODO: start menu and score by time
//TODO: multiplayer

var names = Object.keys(zukan)

function find_true_next_word(word){
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
  if(word.slice(-1) == "ー"){
    word = word.substr(0,word.length-1)
  }
  if(Object.keys(replacing_letters).indexOf(word.slice(-1)) != -1){
    return replacing_letters[word.slice(-1)]
  }
  return [word.slice(-1)]
}

var app = new Vue({
    el: '#app',
    data: {
      entered_answer : "",
      answered_names : ["アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ".charAt(Math.round( Math.random()*43))],
      //answered_names : ["チ"],
      past_answers : "",
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
      },
      computer_answer : function(){
        starting_letters = find_true_next_word(this.answered_names[this.answered_names.length-1])
        candidates = []
        //find candidates from starting letters
        starting_letters.forEach(starting_letter => {
          names.forEach(name =>{
            if(name[0] == starting_letter && this.answered_names.indexOf(name) == -1 && find_true_next_word(name)[0] != "ン"){
              candidates.push(name)
            }
          })
        if(!candidates){
          //Computer lose
        }
        //find word that has the most few starting words
        candidates_score = []
        candidates.forEach(candidate =>{
          score = 0
          names.forEach(name =>{
            if(find_true_next_word(candidate).indexOf(name[0]) != -1){
              score += 1
            }
          })
          candidates_score.push(score)
        })
        if(this.answered_names.length%2 == 0){
          computer_answer_word = candidates[candidates_score.indexOf(Math.min(...candidates_score))]
          this.answered_names.push(computer_answer_word)
          this.past_answers = '\
          <div class="column">\
            <div class="box has-background-danger">\
                <article class="media">\
                    <div class="media-left">\
                        <figure class="image is-96x96">\
                            <img src="' +
                            zukan[computer_answer_word]["image"]
                            +'"></figure>\
                    </div>\
                    <div class="media-content has-text-centered">\
                        <div class="content">\
                            <div class="title is-8">'+
                            computer_answer_word
                            +'</div>\
                        </div>\
                    </div>\
                </article>\
            </div>\
          </div>'
          + this.past_answers
        }
        });
      },
      restart :function(){
        location.href = "/index.html"
      },
      tweet : function(){
        var tweet_url = 'https://twitter.com/intent/tweet?text=' + "ツイッターシェアボタンのサンプルコード" + "%20%23しりとり" + '&url=' + "https://tokawa0213.github.io/shiritori/";
        location.href = tweet_url
      }
    },
    computed:{
      calculate_score : function(){
        return (this.answered_names.length * 100 - 100)/2
      },
      next_staring_word : function(){
        next_word = find_true_next_word(this.answered_names[this.answered_names.length-1])
        return next_word.join(",")
      },
      is_valid_answer : function(){
        if((this.answered_names.indexOf(this.entered_answer) == -1) && (names.indexOf(this.entered_answer) != -1) && (find_true_next_word(this.answered_names[this.answered_names.length-1]).indexOf(this.entered_answer[0]) != -1)){
          return true
        }else{
          return false
        }
      },
      is_end_of_game: function(){
        if(find_true_next_word(this.answered_names[this.answered_names.length-1])[0]=="ン"){
          return "is-active"
        }else{
          if(this.answered_names.length != 1){
            console.log("www")
            this.computer_answer()
          }
        }
        //TODO: No more vocab
      }
    }
})