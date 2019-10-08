/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var socket ;
let init =  () => {
    $('#connect').click(() =>{
        if(!socket){
            alert("CONNECT")
            const ip = $("#ip").val();
            if(ip){
                socket = io.connect(ip);
            }else{
                socket = io.connect("localhost:3000");
            }
            initSocket();
            $("#connect").remove();
            $("#ip").remove();
        }
    })

}

let initSocket = () => {
    socket.on("blockSelected" , (block) => {

        $("#latestRequests").append(
          "<div class='request w3-cell-row w3-theme-action w3-border'> <p>Columna : "+block.column +" , Fila : "+ block.row + "</p></div>"
        );

    })

    socket.on("reset" , () => {

        $("#latestRequests").append(
          "<div class='request w3-cell-row w3-theme-action w3-border'> <p>RESET!</p></div>"
        );
    })
}

var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        init();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

app.initialize();
