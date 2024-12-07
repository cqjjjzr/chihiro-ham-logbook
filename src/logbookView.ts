import { LitElement, html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


dayjs.extend(utc);


interface LogbookEntry {
  timeOn: number
  timeOff: number
  selfCallsign: string
  destCallsign: string
  sentRst: string
  receivedRst: string
  txFreq: string
  rxFreq: string
  txPower: string
  mode: string
  comment: string
  qth: string
  selfGridsquare: string
  selfRig: string
}


function convertAdifTime(date: string, time: string): number {
  return dayjs.utc(date + time, 'YYYYMMDDHHmmss').unix();
}


@localized()
@customElement('logbook-view')
export class LogbookView extends LitElement {
  @state()
  private data: LogbookEntry[];
  @state()
  private adiFetchFailure: string | null = null;
  @state()
  private detailsDialogOpen: boolean = false;
  @state()
  private detailsDialogContent: LogbookEntry | null = null;

  constructor() {
    super();
    this.data = [];
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    ${this.errorBoxTemplate()}
    ${this.detailsDialogTemplate()}
      <div class="mt-4 border-solid border-stone-400 border-2 rounded w-full h-full grow overflow-auto" id='logbook-wrapper'>
        <table class="min-w-[800px] top-0 w-full h-full">
          <thead><tr class="[&>th]:sticky [&>th]:top-0">
            <th>${msg('UTC时间')}</th>
            <!--<th>${msg('己方呼号')}</th>-->
            <th>${msg('对方呼号')}</th>
            <th>${msg('送出')}</th>
            <th>${msg('收到')}</th>
            <th>${msg('发射频率')}</th>
            <th>${msg('接收频率')}</th>
            <th>${msg('模式')}</th>
            <th>${msg('发射功率')}</th>
          </tr></thead>
          <tbody>${this.dataTemplate()}</tbody>
        </table>
      </div>
    `;
  }

  errorBoxTemplate() {
    if (!this.adiFetchFailure)
      return nothing;
    return html`
    <div class="p-[20px] bg-red-500 text-white mb-[15px]">
      <span class="font-bold">${msg('拉取通联日志失败')}</span>
      <pre class="my-3 text-white">${this.adiFetchFailure}</pre>
    </div>`;
  }

  dataTemplate() {
    return this.data.flatMap(it =>
      html`
      <tr class="cursor-pointer hover:bg-black/5 transition-colors" @click="${() => { this.openDetailsDialog(it); }}">
        <td>${dayjs.unix(it.timeOn).utc().format('YYYY-MM-DD HH:mm:ss')}</td>
        <!--<td>${it.selfCallsign}</td>-->
        <td class="font-mono">${it.destCallsign}</td>
        <td>${it.sentRst}</td>
        <td>${it.receivedRst}</td>
        <td>${it.txFreq} MHz</td>
        <td>${it.rxFreq} MHz</td>
        <td>${it.mode}</td>
        <td>${it.txPower}W</td>
      </tr>
    `);
  }

  detailsDialogTemplate() {
    if (!this.detailsDialogContent)
      return nothing;
    return html`
    <div class="${(this.detailsDialogOpen ? 'block' : 'hidden')} fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black/60 transition-opacity" @click="${() => { this.detailsDialogOpen = false; }}">
        <div class="mx-auto mt-8 w-[60em] bg-white p-8 border-slate-900"
          @click="${(event: Event) => { event.stopPropagation(); }}" role="dialog">
          <div class="flex justify-between items-center">
            <span class="font-bold text-2xl">${this.detailsDialogContent?.selfCallsign} → ${this.detailsDialogContent?.destCallsign}</span>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              @click="${() => {this.detailsDialogOpen = false;}}" aria-label="close">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div class="flex flex-col mt-3">
            <div class="detail-row border-t border-t-slate-700"><span class="w-[30%]">${msg('开始时间（UTC）')}</span><span>${dayjs.unix(this.detailsDialogContent.timeOn).utc().format('YYYY-MM-DD HH:mm:ss')}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('开始时间（本地）')}</span><span>${dayjs.unix(this.detailsDialogContent.timeOn).format('YYYY-MM-DD HH:mm:ss')}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('结束时间（UTC）')}</span><span>${dayjs.unix(this.detailsDialogContent.timeOff).utc().format('YYYY-MM-DD HH:mm:ss')}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('结束时间（本地）')}</span><span></span>${dayjs.unix(this.detailsDialogContent.timeOff).format('YYYY-MM-DD HH:mm:ss')}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('给出对方信号报告')}</span><span>${this.detailsDialogContent.sentRst}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('收到己方信号报告')}</span><span>${this.detailsDialogContent.receivedRst}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('发射频率')}</span><span>${this.detailsDialogContent.txFreq} MHz</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('接收频率')}</span><span>${this.detailsDialogContent.rxFreq} MHz</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('发射功率')}</span><span>${this.detailsDialogContent.txPower} W</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('模式')}</span><span>${this.detailsDialogContent.mode}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('备注（一般为对方设备）')}</span><span>${this.detailsDialogContent.comment}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('对方QTH')}</span><span>${this.detailsDialogContent.qth}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('设备')}</span><span>${this.detailsDialogContent.selfRig}</span></div>
            <div class="detail-row"><span class="w-[30%]">${msg('己方网格坐标')}</span><span>${this.detailsDialogContent.selfGridsquare}</span></div>
          </div>
        </div>
      </div>
    `;
  }

  openDetailsDialog(entry: LogbookEntry) {
    this.detailsDialogContent = entry;
    this.detailsDialogOpen = true;
  }

  firstUpdated(): void {
    (async () => {
      try {
        const logdata = await (await fetch('/logdata.json')).json();
        this.data = logdata.records?.map((record: { [name: string]: string }) => {
          return {
            timeOn: convertAdifTime(record['qso_date'], record['time_on']),
            timeOff: convertAdifTime(record['qso_date_off'], record['time_off']),
            selfCallsign: record['station_callsign'],
            destCallsign: record['call'],
            sentRst: record['rst_sent'],
            receivedRst: record['rst_rcvd'],
            txFreq: record['freq'],
            rxFreq: record['freq_rx'],
            txPower: record['tx_pwr'],
            mode: record['mode'],
            comment: record['comment_intl']?.trim(),
            qth: record['qth_intl']?.trim(),
            selfGridsquare: record['my_gridsquare']?.trim(),
            selfRig: record['my_rig']?.trim()
          } as LogbookEntry;
        }).sort((a: LogbookEntry, b: LogbookEntry) => b.timeOn - a.timeOn) ?? [];
      } catch (ex) {
        console.log(ex);
        this.adiFetchFailure = String(ex);
      }
    })();
  }
}
