import { calculateHit } from '../core/geometry.js';

const timeFormatter = new Intl.DateTimeFormat('ru-RU',{
    year:'numeric', month:'numeric', day:'numeric',
    hour:'2-digit', minute:'2-digit', second:'2-digit'
}); 

export const formatTime = ms => timeFormatter.format(new Date(ms));

export class AppRenderer{
    #plane; 

    constructor(coordinatePlaneRenderer){
        this.#plane = coordinatePlaneRenderer; 
    } 

    render(state){
        this.#renderForm(state.form);
        this.#renderResults(state.points);
        this.#renderCanvas(state.form.r, state.points);
    } 

    #renderForm({x, y, r}){
        document.querySelectorAll('input[name=inputX]')
            .forEach(el => { el.checked = Number(el.value) === x; });
        document.getElementById('inputY').value = y; 
        document.getElementById('selectR').value = r ?? ''; 
    }

    #renderResults(points){
        const tbody = document.querySelector('#table-results tbody');
        tbody.replaceChildren(...points.map(p => this.#row([
            p.x, p.y, p.r, formatTime(p.time), p.isHit ? 'Hit' : 'Miss'
        ])));
    }

    #renderCanvas(r,points){
        this.#plane.drawBaseGraph(r);
        points.forEach(p => {
            const isHit = r ? calculateHit(p.x, p.y, r) : p.isHit;
            this.#plane.drawPoint(p.x, p.y, isHit);
        });
    }

    renderLog(Entries, onRestore){
        const tbody = document.querySelector('#table-log tbody');
        tbody.replaceChildren(...Entries.map(e => {
            const row = this.#row([
                e.id, e.type, this.#fmt(e.oldValue), this.#fmt(e.newValue), formatTime(e.time)
            ]);

            row.classList.toggle('current', e.isCurrent);
            row.classList.toggle('pending', e.isPending);

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Restore';
            btn.disabled = e.isCurrent;
            btn.addEventListener('click', () => onRestore(e.id));
            const td = document.createElement('td');
            td.append(btn);
            row.append(td); 
            return row    
        }));
    }

    #row(cells) {
        const tr = document.createElement('tr');
        cells.forEach(text => {
            const td = document.createElement('td');
            td.textContent = text; 
            tr.append(td)
        });
        return tr
    }

    #fmt(v) {
        if (v === null || v === undefined || v === '') return '—';
        return typeof v === 'object' ? `(${v.x}; ${v.y}; ${v.r})` : String(v);
    }

} 