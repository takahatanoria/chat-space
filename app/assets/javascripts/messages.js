  $(function(){
    function buildMessage(message){

      var image = message.image ? `<img src="${message.image}">` : image = ""

      var html = `<div class="message"  data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${image}  
                    </div>
                  </div>`
                    return html;
    }
  // })
    


    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        var html = buildMessage(message);
        $('.messages').append(html)
        $('form')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})  
      })
      .fail(function(){
        alert('エラー'); 

      })
      .always(() => {
        $(".form__submit").removeAttr("disabled");
      });
    })
 

  var reloadMessages = function() {
    if (window.location.href.match(/messages/)){   //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data("message-id");
    
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}

    })
    .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
      var insertHTML = '';//追加するHTMLの入れ物を作る
      messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildMessage(message); //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML);//メッセージを追加
      })
      $('div').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      // $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
    })
    .fail(function () {
      alert('自動更新に失敗しました');//ダメだったらアラートを出す
    });
  }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});





