<template>
    <div class="calendar">
        <div class="data">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M15.3769 18L10.4375 13.0606C9.85417 12.4773 9.85417 11.5227 10.4375 10.9394L15.3769 6" stroke="#3D3D3D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="texting-1">Июнь 2025</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.62311 18L13.5625 13.0606C14.1458 12.4773 14.1458 11.5227 13.5625 10.9394L8.62311 6" stroke="#3D3D3D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="line"></div>
        <table>
            <thead>
                <tr>
                    <th class="healding-3">Пн</th>
                    <th class="healding-3">Вт</th>
                    <th class="healding-3">Ср</th>
                    <th class="healding-3">Чт</th>
                    <th class="healding-3">Пт</th>
                    <th class="healding-3" id="weekend">Сб</th>
                    <th class="healding-3" id="weekend">Вс</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th class="texting-2" id="disabled">27</th>
                    <th class="texting-2" id="disabled">28</th>
                    <th class="texting-2" id="disabled">29</th>
                    <th class="texting-2" id="disabled">30</th>
                    <th class="texting-2" id="disabled">31</th>
                    <th class="texting-2" id="weekend">1</th>
                    <th class="texting-2" id="weekend">2</th>
                </tr>
                <tr>
                    <th class="texting-2">3</th>
                    <th class="texting-2">4</th>
                    <th class="texting-2">5</th>
                    <th class="texting-2">6</th>
                    <th class="texting-2">7</th>
                    <th class="texting-2" id="weekend">8</th>
                    <th class="texting-2" id="weekend">9</th>
                </tr>
                <tr>
                    <th class="texting-2">10</th>
                    <th class="texting-2">11</th>
                    <th class="texting-2">12</th>
                    <th class="texting-2">13</th>
                    <th class="texting-2">14</th>
                    <th class="texting-2" id="weekend">15</th>
                    <th class="texting-2" id="weekend">16</th>
                </tr>
                <tr>
                    <th class="texting-2">17</th>
                    <th class="texting-2">18</th>
                    <th class="texting-2">19</th>
                    <th class="texting-2">20</th>
                    <th class="texting-2">21</th>
                    <th class="texting-2" id="weekend">22</th>
                    <th class="texting-2" id="weekend">23</th>
                </tr>
                <tr>
                    <th class="texting-2">24</th>
                    <th class="texting-2">25</th>
                    <th class="texting-2">26</th>
                    <th class="texting-2">27</th>
                    <th class="texting-2">28</th>
                    <th class="texting-2" id="weekend">29</th>
                    <th class="texting-2" id="weekend">30</th>
                </tr>
                <tr>
                    <th class="texting-2">31</th>
                    <th class="texting-2" id="disabled">1</th>
                    <th class="texting-2" id="disabled">2</th>
                    <th class="texting-2" id="disabled">3</th>
                    <th class="texting-2" id="disabled">4</th>
                    <th class="texting-2" id="disabled">5</th>
                    <th class="texting-2" id="disabled">6</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    @import "@/css/components/variables/text-style.css";
    @import "@/css/components/variables/variables.css";

    .calendar{
        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        align-self: stretch;
        width: 291px;
        padding: 16px !important;
        background-color: var(--card-background_white_fill);
        border-radius: 8px;
    }
    .data {
        display: flex;
        align-items: center ;
        gap: 10px;
    }
    .line{
        stroke-width: 1px;
        stroke: var(--text-background_light-gray_text);  
    }
    table thead tr {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
    }
    table tbody {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    th {
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    display: flex; 
    }
    tr{
        display: flex;
        justify-content: space-between;
    }
    th#weekend{
        color: var(--text-background_blue_text);
    }
    table{
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 12px;
    }
</style>