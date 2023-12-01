import './index.css';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { MorseAnimator } from './morseAnimator.ts';
import { type Ref, createRef, ref } from 'lit/directives/ref.js';

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

  render() {
    return html` <div class="w-full max-w-4xl mx-auto my-auto relative" id="app-cont">
      <div class="mt-8 mx-6 inline-block text-xl leading-none text-center">
      <a href="https://chariri.moe/" target="_blank" class="ml-1 flex justify-start items-center">
        <span class="text-2xl">🌰</span><span>茶栗栗屋 blog</span>
      </a>
      </div>
      <header class="mt-3 mx-6 max-w-full">
        <pre ${ref(this.cqcqText)} class="typewriter block typewriter-small-text">CQ CQ DE</pre>
        <pre ${ref(this.cqcqMorse)} class="typewriter leading-tight typewriter-small-morse">·-·- --·-   ·-·- --·-   -··· ·</pre>
        <pre ${ref(this.callsignText)} class="typewriter block font-bold typewriter-large-text">BD4WXB</pre>
        <pre ${ref(this.callsignMorse)} class="typewriter leading-tight typewriter-large-morse">-··· -·· ····- ·-- -··- -···</pre>
      </header>
      <div class="w-full duration-500 opacity-0" ${ref(this.contentElement)}>
        <h2 class="text-center text-[#0000f5] text-opacity-1" lang="ja">「忘れたくない想い、ありますか？」</h2>
        <hr ${ref(this.dividerElement)} class="uk-divider-icon w-0 duration-1000 mx-auto" />
        <article class="mx-6">
        <h2 class="text-center uk-h2">茶栗的个人业余电台</h2>
          <dl class="uk-description-list">
            <dt>台址</dt>
            <dd>CRAC 4 区 - 江苏省南京市栖霞区南京大学仙林校区 - <span class="font-mono">OM92lc</span></dd>
            <dt>设备</dt>
            <dd><ul class="uk-list uk-list-circle">
              <li>欧讯 KG-UV9D(Plus) + 钻石 SRH771 天线</li>
            </ul></dd>
            <dt>等级</dt>
            <dd>A - 仅限 25 W 功率以下，50~54、144~148 与 430~440 MHz 发射</dd>
            <dt>频率与模式</dt>
            <dd><ul class="uk-list uk-list-circle">
              <li>430~440 MHz (UHF)，FM，个人较活跃的频率为 438.5 MHz 直频与 430.61 MHz 南京紫金山中继</li>
              <li>144~148 MHz (VHF)，FM，个人不常用</li>
            </ul></dd>
            <dt>线上联系方式</dt>
            <dd class="font-mono"><a href="mailto:chariri <chariri@chariri.moe>">chariri@chariri.moe</a></dd>
          </dl>

          <h3 class="uk-h3">QSL 卡片交换</h3>
          <div class="indent-[2em]">
            <p>欢迎与我成功通联的友台交换 QSL 卡片，由于目前本人暂未办妥卡片代理人相关事宜，请在通联后直接通过上述 E-Mail 联系我并告知您的邮寄地址，我会寄出 QSL 卡片并告知您我的 QSL 卡片。向我邮寄卡片时不需要附上 SASE。</p>
            <p>目前我暂不接受电子 QSL 卡片，但会不定期将通联日志上传到本站与 LoTW，您可通过下方的 Logbook 确认我们的通联。</p>
            <div class="flex justify-evenly justify-items-center my-4 flex-wrap shrink">
              <img src="assets/QSLCard.webp" class="qsl-img">
              <img src="assets/QSLCard-Back.webp" class="qsl-img">
            </div>
            <p class="indent-0 text-center">
              我的 QSL 卡片<br>
              其中正面来自 <a href="https://shiro.love/">Shiro</a> 即 BI3AR 的<a href="https://forum.hamcq.cn/d/418">设计</a>，背面的插画为插画师 <a href="https://www.pixiv.net/users/418969">TID</a> 的作品<a href="https://www.pixiv.net/artworks/99486679">「🍀」</a>
            </p>
          </div>
          <hr class="uk-divider-icon" />
          <h3 class="uk-h3">通联日志</h3>
          （TODO）
        </article>
        <h2 class="text-center text-[#f2a93b] text-opacity-1" lang="ja">「聞こえますか？真実の旋律。」</h2>
        <footer class="mx-6 my-6 text-center">Chihiro HAM Logbook, Copyleft 2023 chariri, Made with TypeScript, Lit, UIKit and ♥, 本主页开源在 GitHub<br>
        <a href="https://chariri.moe">个人 Blog</a> - <a href="https://m.chariri.moe/@chariri">Misskey</a></footer>
      </div>
    </div>`;
  }

  firstUpdated(): void {
    const cqAnimation = new MorseAnimator(this.cqcqText.value!, this.cqcqMorse.value!);
    const csAnimation = new MorseAnimator(this.callsignText.value!, this.callsignMorse.value!);
    cqAnimation.beginAnimation(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        csAnimation.beginAnimation(() => {
          this.contentElement.value!.style.opacity = "1.0";
          this.dividerElement.value!.style.width = "100%";
        });
      }, 200);
    });
  }
}