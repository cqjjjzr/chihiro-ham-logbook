import './index.css';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { type Ref, createRef, ref } from 'lit/directives/ref.js';

import './logbookView.ts';
import { MorseAnimator } from './morseAnimator.ts';

@customElement('app-main')
export class AppMain extends LitElement {
  cqcqText: Ref<HTMLElement> = createRef();
  cqcqMorse: Ref<HTMLElement> = createRef();
  callsignText: Ref<HTMLElement> = createRef();
  callsignMorse: Ref<HTMLElement> = createRef();
  contentElement: Ref<HTMLElement> = createRef();
  dividerElement: Ref<HTMLElement> = createRef();

  createRenderRoot(): AppMain {
    return this; // No shadow root
  }

  headerTemplate() {
    return html`
      <header class="mt-3 mx-6 max-w-full">
        <pre ${ref(this.cqcqText)} class="typewriter block typewriter-small-text">CQ CQ DE</pre>
        <pre ${ref(this.cqcqMorse)} class="typewriter leading-tight typewriter-small-morse">·-·- --·-   ·-·- --·-   -··· ·</pre>
        <pre ${ref(this.callsignText)} class="typewriter block font-bold typewriter-large-text">BD4WXB</pre>
        <pre ${ref(this.callsignMorse)} class="typewriter leading-tight typewriter-large-morse">-··· -·· ····- ·-- -··- -···</pre>
      </header>
    `;
  }

  footerTemplate() {
    return html`
      <footer class="mx-6 my-6 text-center">
        <h2 class="text-center text-[#f2a93b] text-opacity-1" lang="ja">「聞こえますか？真実の旋律。」</h2>
        ${msg(html`Chihiro HAM Logbook, Copyleft 2023 chariri, Made with TypeScript, TailwindCSS, Lit, UIKit and ♥, 本主页开源在 <a href="https://github.com/cqjjjzr/chihiro-ham-logbook">GitHub</a>`)}<br>
        ${msg(html`<a href="https://chariri.moe">个人 Blog</a> - <a href="https://m.chariri.moe/@chariri">Misskey</a>`)}
      </footer>
    `;
  }

  descriptionTemplate() {
    return html`
      <h2 class="text-center uk-h2">${msg('茶栗的个人业余电台')}</h2>
      <dl class="uk-description-list">
        <dt>${msg('台址')}</dt>
        <dd>${msg(html`CRAC 4 区 - 江苏省南京市栖霞区仙林大道 - <span class="font-mono">OM92lc</span>`)}</dd>
        <dt>${msg('设备')}</dt>
        <dd><ul class="uk-list uk-list-circle">
          <li>${msg('欧讯 KG-UV9D(Plus) + 钻石 SRH771 天线')}</li>
          <li>${msg('即时通 D9000app + 钻石 SRH770H 天线')}</li>
        </ul></dd>
        <dt>${msg('等级')}</dt>
        <dd>${msg('A - 仅限 25 W 功率以下，50~54、144~148 与 430~440 MHz 发射')}</dd>
        <dt>${msg('频率与模式')}</dt>
        <dd><ul class="uk-list uk-list-circle">
          <li>${msg('430~440 MHz (UHF)，FM，个人较活跃的频率为 438.5 MHz 直频与 430.61 MHz 南京紫金山中继')}</li>
          <li>${msg('144~148 MHz (VHF)，FM，个人不常用')}</li>
        </ul></dd>
        <dt>${msg('邮寄地址')}</dt>
        <dd>${msg('江苏省南京市21004294号邮箱 210042')}</dd>
        <dt>${msg('线上联系方式')}</dt>
        <dd class="font-mono"><a href="mailto:chariri <chariri@chariri.moe>">chariri@chariri.moe</a></dd>
      </dl>
      <h3 class="uk-h3">${msg('QSL 卡片交换')}</h3>
      <div class="indent-[2em]">
        <p>${msg('欢迎与我成功通联的友台交换 QSL 卡片，纸质卡片请直接向上表中地址寄出。我会查询 HamCQ 与 QRZ.com 并向我能查到信息的友台寄送卡片，或在收到卡片后回寄。向我邮寄卡片时不需要附上 SASE。')}</p>
        <p>${msg('目前我暂不接受电子 QSL 卡片，但会不定期将通联日志上传到本站与 LoTW，您可通过下方的 Logbook 确认我们的通联。')}</p>
        <div class="flex justify-evenly justify-items-center my-4 flex-wrap shrink">
          <img src="assets/QSLCard.webp" class="qsl-img">
          <img src="assets/QSLCard-Back.webp" class="qsl-img">
        </div>
        <p class="indent-0 text-center">
          ${msg('我的 QSL 卡片')}<br>
          ${msg(html`其中正面来自 <a href="https://shiro.love/">Shiro</a> 即 BI3AR 的<a href="https://forum.hamcq.cn/d/418">设计</a>，背面的插画为插画师 <a href="https://www.pixiv.net/users/418969">TID</a> 的作品<a href="https://www.pixiv.net/artworks/99486679">「🍀」</a>`)}
        </p>
      </div>
    `;
  }

  render() {
    return html` <div class="w-full max-w-4xl mx-auto my-auto relative" id="app-cont">
      <div class="mt-8 mx-6 inline-block text-xl leading-none text-center">
      <a href="https://chariri.moe/" target="_blank" class="ml-1 flex justify-start items-center">
        <span class="text-2xl">🌰</span><span>${msg('茶栗栗屋 blog')}</span>
      </a>
      </div>
      ${this.headerTemplate()}
      <div class="w-full duration-500 opacity-0" ${ref(this.contentElement)}>
        <h2 class="text-center text-[#0000f5] text-opacity-1" lang="ja">「忘れたくない想い、ありますか？」</h2>
        <hr ${ref(this.dividerElement)} class="uk-divider-icon w-0 duration-1000 mx-auto" />
        <article class="mx-6">
          ${this.descriptionTemplate()}
          <hr class="uk-divider-icon" />
          <h3 class="uk-h3">${msg('通联日志')}</h3>
          <logbook-view class="block mx-0 h-[80vh]"></logbook-view>
        </article>
      </div>
      
      ${this.footerTemplate()}
    </div>`;
  }

  firstUpdated(): void {
    const scrollListener = () => {
      if (window.scrollY > 20) {
        window.removeEventListener("scroll", scrollListener);
        this.contentElement.value!.style.opacity = "1.0";
      }
    };
    window.addEventListener("scroll", scrollListener);
    const cqAnimation = new MorseAnimator(this.cqcqText.value!, this.cqcqMorse.value!);
    const csAnimation = new MorseAnimator(this.callsignText.value!, this.callsignMorse.value!);
    cqAnimation.beginAnimation(() => {
      setTimeout(() => {
        csAnimation.beginAnimation(() => {
          this.contentElement.value!.style.opacity = "1.0";
          this.dividerElement.value!.style.width = "100%";
        });
      }, 200);
    });
  }
}
