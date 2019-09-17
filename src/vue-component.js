Vue.component('place-name', {
    props: ['name'],
    template: '<b-list-group-item class="fade-in"> <span id="name">{{ name }} </span> </b-list-group-item>'
});