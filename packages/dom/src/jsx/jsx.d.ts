import type { JsxChild, JsxElement, JsxIntrinsicElements, ObservableMaybe } from '@rxjsx/core'
import type { Properties } from 'csstype'

export type EventHandler<TTarget, TEvent extends Event = Event> = (
  e: TEvent & {
    currentTarget: TTarget
    target: Element
  }
) => void

// #region components for JSX

interface DOMAttributes<T> {
  children?: JsxElement | JsxElement[]
  innerHTML?: string
  innerText?: string | number
  textContent?: string | number
  onCopy?: EventHandler<T, ClipboardEvent>
  onCut?: EventHandler<T, ClipboardEvent>
  onPaste?: EventHandler<T, ClipboardEvent>
  onCompositionEnd?: EventHandler<T, CompositionEvent>
  onCompositionStart?: EventHandler<T, CompositionEvent>
  onCompositionUpdate?: EventHandler<T, CompositionEvent>
  onFocus?: EventHandler<T, FocusEvent>
  onFocusOut?: EventHandler<T, FocusEvent>
  onFocusIn?: EventHandler<T, FocusEvent>
  onBlur?: EventHandler<T, FocusEvent>
  onChange?: EventHandler<T, Event>
  onInvalid?: EventHandler<T, Event>
  onInput?: EventHandler<T, InputEvent>
  onBeforeInput?: EventHandler<T, InputEvent>
  onReset?: EventHandler<T, Event>
  onSubmit?: EventHandler<
    T,
    Event & {
      submitter: HTMLElement
    }
  >
  onLoad?: EventHandler<T, Event>
  onError?: EventHandler<T, Event>
  onKeyDown?: EventHandler<T, KeyboardEvent>
  onKeyPress?: EventHandler<T, KeyboardEvent>
  onKeyUp?: EventHandler<T, KeyboardEvent>
  onGotPointerCapture?: EventHandler<T, PointerEvent>
  onLostPointerCapture?: EventHandler<T, PointerEvent>
  onPointerCancel?: EventHandler<T, PointerEvent>
  onPointerDown?: EventHandler<T, PointerEvent>
  onPointerEnter?: EventHandler<T, PointerEvent>
  onPointerLeave?: EventHandler<T, PointerEvent>
  onPointerMove?: EventHandler<T, PointerEvent>
  onPointerOver?: EventHandler<T, PointerEvent>
  onPointerOut?: EventHandler<T, PointerEvent>
  onPointerUp?: EventHandler<T, PointerEvent>
  onAbort?: EventHandler<T, Event>
  onCanPlay?: EventHandler<T, Event>
  onCanPlayThrough?: EventHandler<T, Event>
  onDurationChange?: EventHandler<T, Event>
  onEmptied?: EventHandler<T, Event>
  onEncrypted?: EventHandler<T, Event>
  onEnded?: EventHandler<T, Event>
  onLoadedData?: EventHandler<T, Event>
  onLoadedMetadata?: EventHandler<T, Event>
  onLoadStart?: EventHandler<T, Event>
  onPause?: EventHandler<T, Event>
  onPlay?: EventHandler<T, Event>
  onPlaying?: EventHandler<T, Event>
  onProgress?: EventHandler<T, Event>
  onRateChange?: EventHandler<T, Event>
  onSeeked?: EventHandler<T, Event>
  onSeeking?: EventHandler<T, Event>
  onStalled?: EventHandler<T, Event>
  onSuspend?: EventHandler<T, Event>
  onTimeUpdate?: EventHandler<T, Event>
  onVolumeChange?: EventHandler<T, Event>
  onWaiting?: EventHandler<T, Event>
  onClick?: EventHandler<T, MouseEvent>
  onAuxClick?: EventHandler<T, MouseEvent>
  onContextMenu?: EventHandler<T, MouseEvent>
  onDblClick?: EventHandler<T, MouseEvent>
  onDrag?: EventHandler<T, DragEvent>
  onDragEnd?: EventHandler<T, DragEvent>
  onDragEnter?: EventHandler<T, DragEvent>
  onDragExit?: EventHandler<T, DragEvent>
  onDragLeave?: EventHandler<T, DragEvent>
  onDragOver?: EventHandler<T, DragEvent>
  onDragStart?: EventHandler<T, DragEvent>
  onDrop?: EventHandler<T, DragEvent>
  onMouseDown?: EventHandler<T, MouseEvent>
  onMouseEnter?: EventHandler<T, MouseEvent>
  onMouseLeave?: EventHandler<T, MouseEvent>
  onMouseMove?: EventHandler<T, MouseEvent>
  onMouseOut?: EventHandler<T, MouseEvent>
  onMouseOver?: EventHandler<T, MouseEvent>
  onMouseUp?: EventHandler<T, MouseEvent>
  onSelect?: EventHandler<T, UIEvent>
  onTouchCancel?: EventHandler<T, TouchEvent>
  onTouchEnd?: EventHandler<T, TouchEvent>
  onTouchMove?: EventHandler<T, TouchEvent>
  onTouchStart?: EventHandler<T, TouchEvent>
  onScroll?: EventHandler<T, UIEvent>
  onWheel?: EventHandler<T, WheelEvent>
  onAnimationStart?: EventHandler<T, AnimationEvent>
  onAnimationEnd?: EventHandler<T, AnimationEvent>
  onAnimationIteration?: EventHandler<T, AnimationEvent>
  onTransitionEnd?: EventHandler<T, TransitionEvent>

  // lower case events
  oncopy?: EventHandler<T, ClipboardEvent>
  oncut?: EventHandler<T, ClipboardEvent>
  onpaste?: EventHandler<T, ClipboardEvent>
  oncompositionend?: EventHandler<T, CompositionEvent>
  oncompositionstart?: EventHandler<T, CompositionEvent>
  oncompositionupdate?: EventHandler<T, CompositionEvent>
  onfocus?: EventHandler<T, FocusEvent>
  onfocusout?: EventHandler<T, FocusEvent>
  onfocusin?: EventHandler<T, FocusEvent>
  onblur?: EventHandler<T, FocusEvent>
  onchange?: EventHandler<T, Event>
  oninvalid?: EventHandler<T, Event>
  oninput?: EventHandler<T, InputEvent>
  onbeforeinput?: EventHandler<T, InputEvent>
  onreset?: EventHandler<T, Event>
  onsubmit?: EventHandler<
    T,
    Event & {
      submitter: HTMLElement
    }
  >
  onload?: EventHandler<T, Event>
  onerror?: EventHandler<T, Event>
  onkeydown?: EventHandler<T, KeyboardEvent>
  onkeypress?: EventHandler<T, KeyboardEvent>
  onkeyup?: EventHandler<T, KeyboardEvent>
  ongotpointercapture?: EventHandler<T, PointerEvent>
  onlostpointercapture?: EventHandler<T, PointerEvent>
  onpointercancel?: EventHandler<T, PointerEvent>
  onpointerdown?: EventHandler<T, PointerEvent>
  onpointerenter?: EventHandler<T, PointerEvent>
  onpointerleave?: EventHandler<T, PointerEvent>
  onpointermove?: EventHandler<T, PointerEvent>
  onpointerover?: EventHandler<T, PointerEvent>
  onpointerout?: EventHandler<T, PointerEvent>
  onpointerup?: EventHandler<T, PointerEvent>
  onabort?: EventHandler<T, Event>
  oncanplay?: EventHandler<T, Event>
  oncanplaythrough?: EventHandler<T, Event>
  ondurationchange?: EventHandler<T, Event>
  onemptied?: EventHandler<T, Event>
  onencrypted?: EventHandler<T, Event>
  onended?: EventHandler<T, Event>
  onloadeddata?: EventHandler<T, Event>
  onloadedmetadata?: EventHandler<T, Event>
  onloadstart?: EventHandler<T, Event>
  onpause?: EventHandler<T, Event>
  onplay?: EventHandler<T, Event>
  onplaying?: EventHandler<T, Event>
  onprogress?: EventHandler<T, Event>
  onratechange?: EventHandler<T, Event>
  onseeked?: EventHandler<T, Event>
  onseeking?: EventHandler<T, Event>
  onstalled?: EventHandler<T, Event>
  onsuspend?: EventHandler<T, Event>
  ontimeupdate?: EventHandler<T, Event>
  onvolumechange?: EventHandler<T, Event>
  onwaiting?: EventHandler<T, Event>
  onclick?: EventHandler<T, MouseEvent>
  onauxclick?: EventHandler<T, MouseEvent>
  oncontextmenu?: EventHandler<T, MouseEvent>
  ondblclick?: EventHandler<T, MouseEvent>
  ondrag?: EventHandler<T, DragEvent>
  ondragend?: EventHandler<T, DragEvent>
  ondragenter?: EventHandler<T, DragEvent>
  ondragexit?: EventHandler<T, DragEvent>
  ondragleave?: EventHandler<T, DragEvent>
  ondragover?: EventHandler<T, DragEvent>
  ondragstart?: EventHandler<T, DragEvent>
  ondrop?: EventHandler<T, DragEvent>
  onmousedown?: EventHandler<T, MouseEvent>
  onmouseenter?: EventHandler<T, MouseEvent>
  onmouseleave?: EventHandler<T, MouseEvent>
  onmousemove?: EventHandler<T, MouseEvent>
  onmouseout?: EventHandler<T, MouseEvent>
  onmouseover?: EventHandler<T, MouseEvent>
  onmouseup?: EventHandler<T, MouseEvent>
  onselect?: EventHandler<T, UIEvent>
  ontouchcancel?: EventHandler<T, TouchEvent>
  ontouchend?: EventHandler<T, TouchEvent>
  ontouchmove?: EventHandler<T, TouchEvent>
  ontouchstart?: EventHandler<T, TouchEvent>
  onscroll?: EventHandler<T, UIEvent>
  onwheel?: EventHandler<T, WheelEvent>
  onanimationstart?: EventHandler<T, AnimationEvent>
  onanimationend?: EventHandler<T, AnimationEvent>
  onanimationiteration?: EventHandler<T, AnimationEvent>
  ontransitionend?: EventHandler<T, TransitionEvent>
}

type CSSProperties = Properties

type HTMLAutocapitalize = 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
type HTMLDir = 'ltr' | 'rtl' | 'auto'
type HTMLFormEncType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
type HTMLFormMethod = 'post' | 'get' | 'dialog'
type HTMLCrossorigin = 'anonymous' | 'use-credentials' | ''
type HTMLReferrerPolicy =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'
type HTMLIframeSandbox =
  | 'allow-downloads-without-user-activation'
  | 'allow-downloads'
  | 'allow-forms'
  | 'allow-modals'
  | 'allow-orientation-lock'
  | 'allow-pointer-lock'
  | 'allow-popups'
  | 'allow-popups-to-escape-sandbox'
  | 'allow-presentation'
  | 'allow-same-origin'
  | 'allow-scripts'
  | 'allow-storage-access-by-user-activation'
  | 'allow-top-navigation'
  | 'allow-top-navigation-by-user-activation'
type HTMLLinkAs =
  | 'audio'
  | 'document'
  | 'embed'
  | 'fetch'
  | 'font'
  | 'image'
  | 'object'
  | 'script'
  | 'style'
  | 'track'
  | 'video'
  | 'worker'

// All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  'aria-activedescendant'?: string
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  'aria-atomic'?: boolean | 'false' | 'true'
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  'aria-busy'?: boolean | 'false' | 'true'
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'aria-checked'?: boolean | 'false' | 'mixed' | 'true'
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'aria-colcount'?: number | string
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'aria-colindex'?: number | string
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'aria-colspan'?: number | string
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  'aria-controls'?: string
  /** Indicates the element that represents the current item within a container or set of related elements. */
  'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby'?: string
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'aria-details'?: string
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'aria-disabled'?: boolean | 'false' | 'true'
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'aria-errormessage'?: string
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  'aria-expanded'?: boolean | 'false' | 'true'
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  'aria-flowto'?: string
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'aria-grabbed'?: boolean | 'false' | 'true'
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'aria-hidden'?: boolean | 'false' | 'true'
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  'aria-keyshortcuts'?: string
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label'?: string
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby'?: string
  /** Defines the hierarchical level of an element within a structure. */
  'aria-level'?: number | string
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  'aria-live'?: 'off' | 'assertive' | 'polite'
  /** Indicates whether an element is modal when displayed. */
  'aria-modal'?: boolean | 'false' | 'true'
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'aria-multiline'?: boolean | 'false' | 'true'
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  'aria-multiselectable'?: boolean | 'false' | 'true'
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  'aria-orientation'?: 'horizontal' | 'vertical'
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  'aria-owns'?: string
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  'aria-placeholder'?: string
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  'aria-posinset'?: number | string
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'aria-readonly'?: boolean | 'false' | 'true'
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'aria-relevant'?:
    | 'additions'
    | 'additions removals'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'removals additions'
    | 'removals text'
    | 'text'
    | 'text additions'
    | 'text removals'
  /** Indicates that user input is required on the element before a form may be submitted. */
  'aria-required'?: boolean | 'false' | 'true'
  /** Defines a human-readable, author-localized description for the role of an element. */
  'aria-roledescription'?: string
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'aria-rowcount'?: number | string
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'aria-rowindex'?: number | string
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'aria-rowspan'?: number | string
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'aria-selected'?: boolean | 'false' | 'true'
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  'aria-setsize'?: number | string
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
  /** Defines the maximum allowed value for a range widget. */
  'aria-valuemax'?: number | string
  /** Defines the minimum allowed value for a range widget. */
  'aria-valuemin'?: number | string
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'aria-valuenow'?: number | string
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'aria-valuetext'?: string
  role?: ObservableMaybe<
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'button'
    | 'cell'
    | 'checkbox'
    | 'columnheader'
    | 'combobox'
    | 'complementary'
    | 'contentinfo'
    | 'definition'
    | 'dialog'
    | 'directory'
    | 'document'
    | 'feed'
    | 'figure'
    | 'form'
    | 'grid'
    | 'gridcell'
    | 'group'
    | 'heading'
    | 'img'
    | 'link'
    | 'list'
    | 'listbox'
    | 'listitem'
    | 'log'
    | 'main'
    | 'marquee'
    | 'math'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'meter'
    | 'navigation'
    | 'none'
    | 'note'
    | 'option'
    | 'presentation'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'region'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'scrollbar'
    | 'search'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'status'
    | 'switch'
    | 'tab'
    | 'table'
    | 'tablist'
    | 'tabpanel'
    | 'term'
    | 'textbox'
    | 'timer'
    | 'toolbar'
    | 'tooltip'
    | 'tree'
    | 'treegrid'
    | 'treeitem'
  >
}

interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  accessKey?: ObservableMaybe<string>
  class?: ObservableMaybe<string>
  contenteditable?: ObservableMaybe<boolean | 'inherit'>
  contextmenu?: ObservableMaybe<string>
  dir?: ObservableMaybe<HTMLDir>
  draggable?: ObservableMaybe<boolean>
  hidden?: ObservableMaybe<boolean>
  id?: ObservableMaybe<string>
  lang?: ObservableMaybe<string>
  spellcheck?: ObservableMaybe<boolean>
  style?: ObservableMaybe<CSSProperties | string>
  tabindex?: ObservableMaybe<number | string>
  title?: ObservableMaybe<string>
  translate?: ObservableMaybe<'yes' | 'no'>
  about?: ObservableMaybe<string>
  datatype?: ObservableMaybe<string>
  inlist?: ObservableMaybe<any>
  prefix?: ObservableMaybe<string>
  property?: ObservableMaybe<string>
  resource?: ObservableMaybe<string>
  typeof?: ObservableMaybe<string>
  vocab?: ObservableMaybe<string>
  autocapitalize?: ObservableMaybe<HTMLAutocapitalize>
  slot?: ObservableMaybe<string>
  color?: ObservableMaybe<string>
  itemprop?: ObservableMaybe<string>
  itemscope?: ObservableMaybe<boolean>
  itemtype?: ObservableMaybe<string>
  itemid?: ObservableMaybe<string>
  itemref?: ObservableMaybe<string>
  part?: ObservableMaybe<string>
  exportparts?: ObservableMaybe<string>
  inputmode?: ObservableMaybe<
    'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  >
  contentEditable?: ObservableMaybe<boolean | 'inherit'>
  contextMenu?: ObservableMaybe<string>
  tabIndex?: ObservableMaybe<number | string>
  autoCapitalize?: ObservableMaybe<HTMLAutocapitalize>
  itemProp?: ObservableMaybe<string>
  itemScope?: ObservableMaybe<boolean>
  itemType?: ObservableMaybe<string>
  itemId?: ObservableMaybe<string>
  itemRef?: ObservableMaybe<string>
  exportParts?: ObservableMaybe<string>
  inputMode?: ObservableMaybe<
    'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  >
}
interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
  download?: ObservableMaybe<any>
  href?: ObservableMaybe<string>
  hreflang?: ObservableMaybe<string>
  media?: ObservableMaybe<string>
  ping?: ObservableMaybe<string>
  referrerpolicy?: ObservableMaybe<HTMLReferrerPolicy>
  rel?: ObservableMaybe<string>
  target?: ObservableMaybe<string>
  type?: ObservableMaybe<string>
  referrerPolicy?: ObservableMaybe<HTMLReferrerPolicy>
}
type AudioHTMLAttributes<T> = MediaHTMLAttributes<T>
interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: ObservableMaybe<string>
  coords?: ObservableMaybe<string>
  download?: ObservableMaybe<any>
  href?: ObservableMaybe<string>
  hreflang?: ObservableMaybe<string>
  ping?: ObservableMaybe<string>
  referrerpolicy?: ObservableMaybe<HTMLReferrerPolicy>
  rel?: ObservableMaybe<string>
  shape?: ObservableMaybe<'rect' | 'circle' | 'poly' | 'default'>
  target?: ObservableMaybe<string>
  referrerPolicy?: ObservableMaybe<HTMLReferrerPolicy>
}
interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
  href?: ObservableMaybe<string>
  target?: ObservableMaybe<string>
}
interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: ObservableMaybe<string>
}
interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  autofocus?: ObservableMaybe<boolean>
  disabled?: ObservableMaybe<boolean>
  form?: ObservableMaybe<string>
  formaction?: ObservableMaybe<string>
  formenctype?: ObservableMaybe<HTMLFormEncType>
  formmethod?: ObservableMaybe<HTMLFormMethod>
  formnovalidate?: ObservableMaybe<boolean>
  formtarget?: ObservableMaybe<string>
  name?: ObservableMaybe<string>
  type?: ObservableMaybe<'submit' | 'reset' | 'button'>
  value?: ObservableMaybe<string>
  formAction?: ObservableMaybe<string>
  formEnctype?: ObservableMaybe<HTMLFormEncType>
  formMethod?: ObservableMaybe<HTMLFormMethod>
  formNoValidate?: ObservableMaybe<boolean>
  formTarget?: ObservableMaybe<string>
}
interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
}
interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
}
interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: ObservableMaybe<number | string>
}
interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: ObservableMaybe<string | string[] | number>
}
interface DetailsHtmlAttributes<T> extends HTMLAttributes<T> {
  open?: ObservableMaybe<boolean>
  onToggle?: EventHandler<T, Event>
  ontoggle?: EventHandler<T, Event>
}
interface DialogHtmlAttributes<T> extends HTMLAttributes<T> {
  open?: ObservableMaybe<boolean>
}
interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: ObservableMaybe<number | string>
  src?: ObservableMaybe<string>
  type?: ObservableMaybe<string>
  width?: ObservableMaybe<number | string>
}
interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: ObservableMaybe<boolean>
  form?: ObservableMaybe<string>
  name?: ObservableMaybe<string>
}
interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
  acceptcharset?: ObservableMaybe<string>
  action?: ObservableMaybe<string>
  autocomplete?: ObservableMaybe<string>
  encoding?: ObservableMaybe<HTMLFormEncType>
  enctype?: ObservableMaybe<HTMLFormEncType>
  method?: ObservableMaybe<HTMLFormMethod>
  name?: ObservableMaybe<string>
  novalidate?: ObservableMaybe<boolean>
  target?: ObservableMaybe<string>
  acceptCharset?: ObservableMaybe<string>
  noValidate?: ObservableMaybe<boolean>
}
interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
  allow?: ObservableMaybe<string>
  allowfullscreen?: ObservableMaybe<boolean>
  height?: ObservableMaybe<number | string>
  name?: ObservableMaybe<string>
  referrerpolicy?: ObservableMaybe<HTMLReferrerPolicy>
  sandbox?: HTMLIframeSandbox | string
  src?: ObservableMaybe<string>
  srcdoc?: ObservableMaybe<string>
  width?: ObservableMaybe<number | string>
  referrerPolicy?: ObservableMaybe<HTMLReferrerPolicy>
}
interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: ObservableMaybe<string>
  crossorigin?: ObservableMaybe<HTMLCrossorigin>
  decoding?: ObservableMaybe<'sync' | 'async' | 'auto'>
  height?: ObservableMaybe<number | string>
  ismap?: ObservableMaybe<boolean>
  isMap?: ObservableMaybe<boolean>
  loading?: ObservableMaybe<'eager' | 'lazy'>
  referrerpolicy?: ObservableMaybe<HTMLReferrerPolicy>
  referrerPolicy?: ObservableMaybe<HTMLReferrerPolicy>
  sizes?: ObservableMaybe<string>
  src?: ObservableMaybe<string>
  srcset?: ObservableMaybe<string>
  srcSet?: ObservableMaybe<string>
  usemap?: ObservableMaybe<string>
  useMap?: ObservableMaybe<string>
  width?: ObservableMaybe<number | string>
  crossOrigin?: ObservableMaybe<HTMLCrossorigin>
}
interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
  accept?: ObservableMaybe<string>
  alt?: ObservableMaybe<string>
  autocomplete?: ObservableMaybe<string>
  autofocus?: ObservableMaybe<boolean>
  capture?: ObservableMaybe<boolean | string>
  checked?: ObservableMaybe<boolean>
  crossorigin?: ObservableMaybe<HTMLCrossorigin>
  disabled?: ObservableMaybe<boolean>
  form?: ObservableMaybe<string>
  formaction?: ObservableMaybe<string>
  formenctype?: ObservableMaybe<HTMLFormEncType>
  formmethod?: ObservableMaybe<HTMLFormMethod>
  formnovalidate?: ObservableMaybe<boolean>
  formtarget?: ObservableMaybe<string>
  height?: ObservableMaybe<number | string>
  list?: ObservableMaybe<string>
  max?: ObservableMaybe<number | string>
  maxlength?: ObservableMaybe<number | string>
  min?: ObservableMaybe<number | string>
  minlength?: ObservableMaybe<number | string>
  multiple?: ObservableMaybe<boolean>
  name?: ObservableMaybe<string>
  pattern?: ObservableMaybe<string>
  placeholder?: ObservableMaybe<string>
  readonly?: ObservableMaybe<boolean>
  required?: ObservableMaybe<boolean>
  size?: ObservableMaybe<number | string>
  src?: ObservableMaybe<string>
  step?: ObservableMaybe<number | string>
  type?: ObservableMaybe<string>
  value?: ObservableMaybe<string | string[] | number>
  width?: ObservableMaybe<number | string>
  crossOrigin?: ObservableMaybe<HTMLCrossorigin>
  formAction?: ObservableMaybe<string>
  formEnctype?: ObservableMaybe<HTMLFormEncType>
  formMethod?: ObservableMaybe<HTMLFormMethod>
  formNoValidate?: ObservableMaybe<boolean>
  formTarget?: ObservableMaybe<string>
  maxLength?: ObservableMaybe<number | string>
  minLength?: ObservableMaybe<number | string>
  readOnly?: ObservableMaybe<boolean>
}
interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: ObservableMaybe<string>
  dateTime?: ObservableMaybe<string>
}
interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
  autofocus?: ObservableMaybe<boolean>
  challenge?: ObservableMaybe<string>
  disabled?: ObservableMaybe<boolean>
  form?: ObservableMaybe<string>
  keytype?: ObservableMaybe<string>
  keyparams?: ObservableMaybe<string>
  name?: ObservableMaybe<string>
}
interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
  for?: ObservableMaybe<string>
  form?: ObservableMaybe<string>
}
interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: ObservableMaybe<number | string>
}
interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
  as?: ObservableMaybe<HTMLLinkAs>
  crossorigin?: ObservableMaybe<HTMLCrossorigin>
  disabled?: ObservableMaybe<boolean>
  href?: ObservableMaybe<string>
  hreflang?: ObservableMaybe<string>
  integrity?: ObservableMaybe<string>
  media?: ObservableMaybe<string>
  referrerpolicy?: ObservableMaybe<HTMLReferrerPolicy>
  rel?: ObservableMaybe<string>
  sizes?: ObservableMaybe<string>
  type?: ObservableMaybe<string>
  crossOrigin?: ObservableMaybe<HTMLCrossorigin>
  referrerPolicy?: ObservableMaybe<HTMLReferrerPolicy>
}
interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: ObservableMaybe<string>
}
interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoplay?: ObservableMaybe<boolean>
  controls?: ObservableMaybe<boolean>
  crossorigin?: ObservableMaybe<HTMLCrossorigin>
  loop?: ObservableMaybe<boolean>
  mediagroup?: ObservableMaybe<string>
  muted?: ObservableMaybe<boolean>
  preload?: ObservableMaybe<'none' | 'metadata' | 'auto' | ''>
  src?: ObservableMaybe<string>
  crossOrigin?: ObservableMaybe<HTMLCrossorigin>
  mediaGroup?: ObservableMaybe<string>
}
interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
  label?: ObservableMaybe<string>
  type?: ObservableMaybe<'context' | 'toolbar'>
}
interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
  charset?: ObservableMaybe<string>
  content?: ObservableMaybe<string>
  httpequiv?: ObservableMaybe<string>
  name?: ObservableMaybe<string>
  httpEquiv?: ObservableMaybe<string>
}
interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: ObservableMaybe<string>
  high?: ObservableMaybe<number | string>
  low?: ObservableMaybe<number | string>
  max?: ObservableMaybe<number | string>
  min?: ObservableMaybe<number | string>
  optimum?: ObservableMaybe<number | string>
  value?: ObservableMaybe<string | string[] | number>
}
interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: ObservableMaybe<string>
}
interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
  data?: ObservableMaybe<string>
  form?: ObservableMaybe<string>
  height?: ObservableMaybe<number | string>
  name?: ObservableMaybe<string>
  type?: ObservableMaybe<string>
  usemap?: ObservableMaybe<string>
  width?: ObservableMaybe<number | string>
  useMap?: ObservableMaybe<string>
}
interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
  reversed?: ObservableMaybe<boolean>
  start?: ObservableMaybe<number | string>
  type?: ObservableMaybe<'1' | 'a' | 'A' | 'i' | 'I'>
}
interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: ObservableMaybe<boolean>
  label?: ObservableMaybe<string>
}
interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: ObservableMaybe<boolean>
  label?: ObservableMaybe<string>
  selected?: ObservableMaybe<boolean>
  value?: ObservableMaybe<string | string[] | number>
}
interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: ObservableMaybe<string>
  for?: ObservableMaybe<string>
  name?: ObservableMaybe<string>
}
interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: ObservableMaybe<string>
  value?: ObservableMaybe<string | string[] | number>
}
interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
  max?: ObservableMaybe<number | string>
  value?: ObservableMaybe<string | string[] | number>
}
interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
  async?: ObservableMaybe<boolean>
  charset?: ObservableMaybe<string>
  crossorigin?: ObservableMaybe<HTMLCrossorigin>
  defer?: ObservableMaybe<boolean>
  integrity?: ObservableMaybe<string>
  nomodule?: ObservableMaybe<boolean>
  nonce?: ObservableMaybe<string>
  referrerpolicy?: ObservableMaybe<HTMLReferrerPolicy>
  src?: ObservableMaybe<string>
  type?: ObservableMaybe<string>
  crossOrigin?: ObservableMaybe<HTMLCrossorigin>
  noModule?: ObservableMaybe<boolean>
  referrerPolicy?: ObservableMaybe<HTMLReferrerPolicy>
}
interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
  autocomplete?: ObservableMaybe<string>
  autofocus?: ObservableMaybe<boolean>
  disabled?: ObservableMaybe<boolean>
  form?: ObservableMaybe<string>
  multiple?: ObservableMaybe<boolean>
  name?: ObservableMaybe<string>
  required?: ObservableMaybe<boolean>
  size?: ObservableMaybe<number | string>
  value?: ObservableMaybe<string | string[] | number>
}
interface HTMLSlotElementAttributes<T = HTMLSlotElement> extends HTMLAttributes<T> {
  name?: ObservableMaybe<string>
}
interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: ObservableMaybe<string>
  sizes?: ObservableMaybe<string>
  src?: ObservableMaybe<string>
  srcset?: ObservableMaybe<string>
  type?: ObservableMaybe<string>
}
interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: ObservableMaybe<string>
  nonce?: ObservableMaybe<string>
  scoped?: ObservableMaybe<boolean>
  type?: ObservableMaybe<string>
}
interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
  colspan?: ObservableMaybe<number | string>
  headers?: ObservableMaybe<string>
  rowspan?: ObservableMaybe<number | string>
  colSpan?: ObservableMaybe<number | string>
  rowSpan?: ObservableMaybe<number | string>
}
interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
  autocomplete?: ObservableMaybe<string>
  autofocus?: ObservableMaybe<boolean>
  cols?: ObservableMaybe<number | string>
  dirname?: ObservableMaybe<string>
  disabled?: ObservableMaybe<boolean>
  form?: ObservableMaybe<string>
  maxlength?: ObservableMaybe<number | string>
  minlength?: ObservableMaybe<number | string>
  name?: ObservableMaybe<string>
  placeholder?: ObservableMaybe<string>
  readonly?: ObservableMaybe<boolean>
  required?: ObservableMaybe<boolean>
  rows?: ObservableMaybe<number | string>
  value?: ObservableMaybe<string | string[] | number>
  wrap?: ObservableMaybe<'hard' | 'soft' | 'off'>
  maxLength?: ObservableMaybe<number | string>
  minLength?: ObservableMaybe<number | string>
  readOnly?: ObservableMaybe<boolean>
}
interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
  colspan?: ObservableMaybe<number | string>
  headers?: ObservableMaybe<string>
  rowspan?: ObservableMaybe<number | string>
  colSpan?: ObservableMaybe<number | string>
  rowSpan?: ObservableMaybe<number | string>
  scope?: ObservableMaybe<'col' | 'row' | 'rowgroup' | 'colgroup'>
}
interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  datetime?: ObservableMaybe<string>
  dateTime?: ObservableMaybe<string>
}
interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
  default?: ObservableMaybe<boolean>
  kind?: ObservableMaybe<'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata'>
  label?: ObservableMaybe<string>
  src?: ObservableMaybe<string>
  srclang?: ObservableMaybe<string>
}
interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
  height?: ObservableMaybe<number | string>
  playsinline?: ObservableMaybe<boolean>
  poster?: ObservableMaybe<string>
  width?: ObservableMaybe<number | string>
}
type SVGPreserveAspectRatio =
  | 'none'
  | 'xMinYMin'
  | 'xMidYMin'
  | 'xMaxYMin'
  | 'xMinYMid'
  | 'xMidYMid'
  | 'xMaxYMid'
  | 'xMinYMax'
  | 'xMidYMax'
  | 'xMaxYMax'
  | 'xMinYMin meet'
  | 'xMidYMin meet'
  | 'xMaxYMin meet'
  | 'xMinYMid meet'
  | 'xMidYMid meet'
  | 'xMaxYMid meet'
  | 'xMinYMax meet'
  | 'xMidYMax meet'
  | 'xMaxYMax meet'
  | 'xMinYMin slice'
  | 'xMidYMin slice'
  | 'xMaxYMin slice'
  | 'xMinYMid slice'
  | 'xMidYMid slice'
  | 'xMaxYMid slice'
  | 'xMinYMax slice'
  | 'xMidYMax slice'
  | 'xMaxYMax slice'
type ImagePreserveAspectRatio =
  | SVGPreserveAspectRatio
  | 'defer none'
  | 'defer xMinYMin'
  | 'defer xMidYMin'
  | 'defer xMaxYMin'
  | 'defer xMinYMid'
  | 'defer xMidYMid'
  | 'defer xMaxYMid'
  | 'defer xMinYMax'
  | 'defer xMidYMax'
  | 'defer xMaxYMax'
  | 'defer xMinYMin meet'
  | 'defer xMidYMin meet'
  | 'defer xMaxYMin meet'
  | 'defer xMinYMid meet'
  | 'defer xMidYMid meet'
  | 'defer xMaxYMid meet'
  | 'defer xMinYMax meet'
  | 'defer xMidYMax meet'
  | 'defer xMaxYMax meet'
  | 'defer xMinYMin slice'
  | 'defer xMidYMin slice'
  | 'defer xMaxYMin slice'
  | 'defer xMinYMid slice'
  | 'defer xMidYMid slice'
  | 'defer xMaxYMid slice'
  | 'defer xMinYMax slice'
  | 'defer xMidYMax slice'
  | 'defer xMaxYMax slice'
type SVGUnits = 'userSpaceOnUse' | 'objectBoundingBox'
interface CoreSVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  id?: ObservableMaybe<string>
  lang?: ObservableMaybe<string>
  tabIndex?: ObservableMaybe<number | string>
  tabindex?: ObservableMaybe<number | string>
}
interface StylableSVGAttributes {
  class?: ObservableMaybe<string>
  style?: ObservableMaybe<CSSProperties | string>
}
interface TransformableSVGAttributes {
  transform?: ObservableMaybe<string>
}
interface ConditionalProcessingSVGAttributes {
  requiredExtensions?: ObservableMaybe<string>
  requiredFeatures?: ObservableMaybe<string>
  systemLanguage?: ObservableMaybe<string>
}
interface ExternalResourceSVGAttributes {
  externalResourcesRequired?: ObservableMaybe<'true' | 'false'>
}
interface AnimationTimingSVGAttributes {
  begin?: ObservableMaybe<string>
  dur?: ObservableMaybe<string>
  end?: ObservableMaybe<string>
  min?: ObservableMaybe<string>
  max?: ObservableMaybe<string>
  restart?: ObservableMaybe<'always' | 'whenNotActive' | 'never'>
  repeatCount?: ObservableMaybe<number | 'indefinite'>
  repeatDur?: ObservableMaybe<string>
  fill?: ObservableMaybe<'freeze' | 'remove'>
}
interface AnimationValueSVGAttributes {
  calcMode?: ObservableMaybe<'discrete' | 'linear' | 'paced' | 'spline'>
  values?: ObservableMaybe<string>
  keyTimes?: ObservableMaybe<string>
  keySplines?: ObservableMaybe<string>
  from?: ObservableMaybe<number | string>
  to?: ObservableMaybe<number | string>
  by?: ObservableMaybe<number | string>
}
interface AnimationAdditionSVGAttributes {
  attributeName?: ObservableMaybe<string>
  additive?: ObservableMaybe<'replace' | 'sum'>
  accumulate?: ObservableMaybe<'none' | 'sum'>
}
interface AnimationAttributeTargetSVGAttributes {
  attributeName?: ObservableMaybe<string>
  attributeType?: ObservableMaybe<'CSS' | 'XML' | 'auto'>
}
interface PresentationSVGAttributes {
  'alignment-baseline'?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'
  'baseline-shift'?: ObservableMaybe<number | string>
  clip?: ObservableMaybe<string>
  'clip-path'?: ObservableMaybe<string>
  'clip-rule'?: 'nonzero' | 'evenodd' | 'inherit'
  color?: ObservableMaybe<string>
  'color-interpolation'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  'color-interpolation-filters'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  'color-profile'?: ObservableMaybe<string>
  'color-rendering'?: 'auto' | 'optimizeSpeed' | 'optimizeQuality' | 'inherit'
  cursor?: ObservableMaybe<string>
  direction?: 'ltr' | 'rtl' | 'inherit'
  display?: ObservableMaybe<string>
  'dominant-baseline'?:
    | 'auto'
    | 'text-bottom'
    | 'alphabetic'
    | 'ideographic'
    | 'middle'
    | 'central'
    | 'mathematical'
    | 'hanging'
    | 'text-top'
    | 'inherit'
  'enable-background'?: ObservableMaybe<string>
  fill?: ObservableMaybe<string>
  'fill-opacity'?: ObservableMaybe<number | string | 'inherit'>
  'fill-rule'?: ObservableMaybe<'nonzero' | 'evenodd' | 'inherit'>
  filter?: ObservableMaybe<string>
  'flood-color'?: ObservableMaybe<string>
  'flood-opacity'?: ObservableMaybe<number | string | 'inherit'>
  'font-family'?: ObservableMaybe<string>
  'font-size'?: ObservableMaybe<string>
  'font-size-adjust'?: ObservableMaybe<number | string>
  'font-stretch'?: ObservableMaybe<string>
  'font-style'?: ObservableMaybe<'normal' | 'italic' | 'oblique' | 'inherit'>
  'font-variant'?: ObservableMaybe<string>
  'font-weight'?: ObservableMaybe<number | string>
  'glyph-orientation-horizontal'?: ObservableMaybe<string>
  'glyph-orientation-vertical'?: ObservableMaybe<string>
  'image-rendering'?: ObservableMaybe<'auto' | 'optimizeQuality' | 'optimizeSpeed' | 'inherit'>
  kerning?: ObservableMaybe<string>
  'letter-spacing'?: ObservableMaybe<number | string>
  'lighting-color'?: ObservableMaybe<string>
  'marker-end'?: ObservableMaybe<string>
  'marker-mid'?: ObservableMaybe<string>
  'marker-start'?: ObservableMaybe<string>
  mask?: ObservableMaybe<string>
  opacity?: ObservableMaybe<number | string | 'inherit'>
  overflow?: ObservableMaybe<'visible' | 'hidden' | 'scroll' | 'auto' | 'inherit'>
  'pointer-events'?: ObservableMaybe<
    | 'bounding-box'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'color'
    | 'fill'
    | 'stroke'
    | 'all'
    | 'none'
    | 'inherit'
  >
  'shape-rendering'?: ObservableMaybe<
    'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision' | 'inherit'
  >
  'stop-color'?: ObservableMaybe<string>
  'stop-opacity'?: ObservableMaybe<number | string | 'inherit'>
  stroke?: ObservableMaybe<string>
  'stroke-dasharray'?: ObservableMaybe<string>
  'stroke-dashoffset'?: ObservableMaybe<number | string>
  'stroke-linecap'?: ObservableMaybe<'butt' | 'round' | 'square' | 'inherit'>
  'stroke-linejoin'?: ObservableMaybe<
    'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round' | 'inherit'
  >
  'stroke-miterlimit'?: ObservableMaybe<number | string | 'inherit'>
  'stroke-opacity'?: ObservableMaybe<number | string | 'inherit'>
  'stroke-width'?: ObservableMaybe<number | string>
  'text-anchor'?: ObservableMaybe<'start' | 'middle' | 'end' | 'inherit'>
  'text-decoration'?: ObservableMaybe<
    'none' | 'underline' | 'overline' | 'line-through' | 'blink' | 'inherit'
  >
  'text-rendering'?: ObservableMaybe<
    'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision' | 'inherit'
  >
  'unicode-bidi'?: ObservableMaybe<string>
  visibility?: ObservableMaybe<'visible' | 'hidden' | 'collapse' | 'inherit'>
  'word-spacing'?: ObservableMaybe<number | string>
  'writing-mode'?: ObservableMaybe<'lr-tb' | 'rl-tb' | 'tb-rl' | 'lr' | 'rl' | 'tb' | 'inherit'>
}
interface AnimationElementSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    ExternalResourceSVGAttributes,
    ConditionalProcessingSVGAttributes {}
interface ContainerElementSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    Pick<
      PresentationSVGAttributes,
      | 'clip-path'
      | 'mask'
      | 'cursor'
      | 'opacity'
      | 'filter'
      | 'enable-background'
      | 'color-interpolation'
      | 'color-rendering'
    > {}
interface FilterPrimitiveElementSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    Pick<PresentationSVGAttributes, 'color-interpolation-filters'> {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
  result?: ObservableMaybe<string>
}
interface SingleInputFilterSVGAttributes {
  in?: ObservableMaybe<string>
}
interface DoubleInputFilterSVGAttributes {
  in?: ObservableMaybe<string>
  in2?: ObservableMaybe<string>
}
interface FitToViewBoxSVGAttributes {
  viewBox?: ObservableMaybe<string>
  preserveAspectRatio?: ObservableMaybe<SVGPreserveAspectRatio>
}
interface GradientElementSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes {
  gradientUnits?: ObservableMaybe<SVGUnits>
  gradientTransform?: ObservableMaybe<string>
  spreadMethod?: ObservableMaybe<'pad' | 'reflect' | 'repeat'>
}
interface GraphicsElementSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    Pick<
      PresentationSVGAttributes,
      | 'clip-rule'
      | 'mask'
      | 'pointer-events'
      | 'cursor'
      | 'opacity'
      | 'filter'
      | 'display'
      | 'visibility'
      | 'color-interpolation'
      | 'color-rendering'
    > {}
type LightSourceElementSVGAttributes<T> = CoreSVGAttributes<T>
interface NewViewportSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    Pick<PresentationSVGAttributes, 'overflow' | 'clip'> {
  viewBox?: ObservableMaybe<string>
}
interface ShapeElementSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    Pick<
      PresentationSVGAttributes,
      | 'color'
      | 'fill'
      | 'fill-rule'
      | 'fill-opacity'
      | 'stroke'
      | 'stroke-width'
      | 'stroke-linecap'
      | 'stroke-linejoin'
      | 'stroke-miterlimit'
      | 'stroke-dasharray'
      | 'stroke-dashoffset'
      | 'stroke-opacity'
      | 'shape-rendering'
    > {}
interface TextContentElementSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    Pick<
      PresentationSVGAttributes,
      | 'font-family'
      | 'font-style'
      | 'font-variant'
      | 'font-weight'
      | 'font-stretch'
      | 'font-size'
      | 'font-size-adjust'
      | 'kerning'
      | 'letter-spacing'
      | 'word-spacing'
      | 'text-decoration'
      | 'glyph-orientation-horizontal'
      | 'glyph-orientation-vertical'
      | 'direction'
      | 'unicode-bidi'
      | 'text-anchor'
      | 'dominant-baseline'
      | 'color'
      | 'fill'
      | 'fill-rule'
      | 'fill-opacity'
      | 'stroke'
      | 'stroke-width'
      | 'stroke-linecap'
      | 'stroke-linejoin'
      | 'stroke-miterlimit'
      | 'stroke-dasharray'
      | 'stroke-dashoffset'
      | 'stroke-opacity'
    > {}
interface ZoomAndPanSVGAttributes {
  zoomAndPan?: ObservableMaybe<'disable' | 'magnify'>
}
interface AnimateSVGAttributes<T>
  extends AnimationElementSVGAttributes<T>,
    AnimationAttributeTargetSVGAttributes,
    AnimationTimingSVGAttributes,
    AnimationValueSVGAttributes,
    AnimationAdditionSVGAttributes,
    Pick<PresentationSVGAttributes, 'color-interpolation' | 'color-rendering'> {}
interface AnimateMotionSVGAttributes<T>
  extends AnimationElementSVGAttributes<T>,
    AnimationTimingSVGAttributes,
    AnimationValueSVGAttributes,
    AnimationAdditionSVGAttributes {
  path?: ObservableMaybe<string>
  keyPoints?: ObservableMaybe<string>
  rotate?: ObservableMaybe<number | string | 'auto' | 'auto-reverse'>
  origin?: ObservableMaybe<'default'>
}
interface AnimateTransformSVGAttributes<T>
  extends AnimationElementSVGAttributes<T>,
    AnimationAttributeTargetSVGAttributes,
    AnimationTimingSVGAttributes,
    AnimationValueSVGAttributes,
    AnimationAdditionSVGAttributes {
  type?: ObservableMaybe<'translate' | 'scale' | 'rotate' | 'skewX' | 'skewY'>
}
interface CircleSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes {
  cx?: ObservableMaybe<number | string>
  cy?: ObservableMaybe<number | string>
  r?: ObservableMaybe<number | string>
}
interface ClipPathSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'clip-path'> {
  clipPathUnits?: ObservableMaybe<SVGUnits>
}
interface DefsSVGAttributes<T>
  extends ContainerElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes {}
interface DescSVGAttributes<T> extends CoreSVGAttributes<T>, StylableSVGAttributes {}
interface EllipseSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes {
  cx?: ObservableMaybe<number | string>
  cy?: ObservableMaybe<number | string>
  rx?: ObservableMaybe<number | string>
  ry?: ObservableMaybe<number | string>
}
interface FeBlendSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    DoubleInputFilterSVGAttributes,
    StylableSVGAttributes {
  mode?: ObservableMaybe<'normal' | 'multiply' | 'screen' | 'darken' | 'lighten'>
}
interface FeColorMatrixSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes {
  type?: ObservableMaybe<'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha'>
  values?: ObservableMaybe<string>
}
interface FeComponentTransferSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes {}
interface FeCompositeSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    DoubleInputFilterSVGAttributes,
    StylableSVGAttributes {
  operator?: ObservableMaybe<'over' | 'in' | 'out' | 'atop' | 'xor' | 'arithmetic'>
  k1?: ObservableMaybe<number | string>
  k2?: ObservableMaybe<number | string>
  k3?: ObservableMaybe<number | string>
  k4?: ObservableMaybe<number | string>
}
interface FeConvolveMatrixSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes {
  order?: ObservableMaybe<number | string>
  kernelMatrix?: ObservableMaybe<string>
  divisor?: ObservableMaybe<number | string>
  bias?: ObservableMaybe<number | string>
  targetX?: ObservableMaybe<number | string>
  targetY?: ObservableMaybe<number | string>
  edgeMode?: ObservableMaybe<'duplicate' | 'wrap' | 'none'>
  kernelUnitLength?: ObservableMaybe<number | string>
  preserveAlpha?: ObservableMaybe<'true' | 'false'>
}
interface FeDiffuseLightingSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes,
    Pick<PresentationSVGAttributes, 'color' | 'lighting-color'> {
  surfaceScale?: ObservableMaybe<number | string>
  diffuseConstant?: ObservableMaybe<number | string>
  kernelUnitLength?: ObservableMaybe<number | string>
}
interface FeDisplacementMapSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    DoubleInputFilterSVGAttributes,
    StylableSVGAttributes {
  scale?: ObservableMaybe<number | string>
  xChannelSelector?: ObservableMaybe<'R' | 'G' | 'B' | 'A'>
  yChannelSelector?: ObservableMaybe<'R' | 'G' | 'B' | 'A'>
}
interface FeDistantLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
  azimuth?: ObservableMaybe<number | string>
  elevation?: ObservableMaybe<number | string>
}
interface FeFloodSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    StylableSVGAttributes,
    Pick<PresentationSVGAttributes, 'color' | 'flood-color' | 'flood-opacity'> {}
interface FeFuncSVGAttributes<T> extends CoreSVGAttributes<T> {
  type?: 'identity' | 'table' | 'discrete' | 'linear' | 'gamma'
  tableValues?: ObservableMaybe<string>
  slope?: ObservableMaybe<number | string>
  intercept?: ObservableMaybe<number | string>
  amplitude?: ObservableMaybe<number | string>
  exponent?: ObservableMaybe<number | string>
  offset?: ObservableMaybe<number | string>
}
interface FeGaussianBlurSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes {
  stdDeviation?: ObservableMaybe<number | string>
}
interface FeImageSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes {
  preserveAspectRatio?: ObservableMaybe<SVGPreserveAspectRatio>
  href?: ObservableMaybe<string>
}
interface FeMergeSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    StylableSVGAttributes {}
interface FeMergeNodeSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    SingleInputFilterSVGAttributes {}
interface FeMorphologySVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes {
  operator?: ObservableMaybe<'erode' | 'dilate'>
  radius?: ObservableMaybe<number | string>
}
interface FeOffsetSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes {
  dx?: ObservableMaybe<number | string>
  dy?: ObservableMaybe<number | string>
}
interface FePointLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  z?: ObservableMaybe<number | string>
}
interface FeSpecularLightingSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes,
    Pick<PresentationSVGAttributes, 'color' | 'lighting-color'> {
  surfaceScale?: ObservableMaybe<string>
  specularConstant?: ObservableMaybe<string>
  specularExponent?: ObservableMaybe<string>
  kernelUnitLength?: ObservableMaybe<number | string>
}
interface FeSpotLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  z?: ObservableMaybe<number | string>
  pointsAtX?: ObservableMaybe<number | string>
  pointsAtY?: ObservableMaybe<number | string>
  pointsAtZ?: ObservableMaybe<number | string>
  specularExponent?: ObservableMaybe<number | string>
  limitingConeAngle?: ObservableMaybe<number | string>
}
interface FeTileSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    SingleInputFilterSVGAttributes,
    StylableSVGAttributes {}
interface FeTurbulanceSVGAttributes<T>
  extends FilterPrimitiveElementSVGAttributes<T>,
    StylableSVGAttributes {
  baseFrequency?: ObservableMaybe<number | string>
  numOctaves?: ObservableMaybe<number | string>
  seed?: ObservableMaybe<number | string>
  stitchTiles?: ObservableMaybe<'stitch' | 'noStitch'>
  type?: ObservableMaybe<'fractalNoise' | 'turbulence'>
}
interface FilterSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes {
  filterUnits?: ObservableMaybe<SVGUnits>
  primitiveUnits?: ObservableMaybe<SVGUnits>
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
  filterRes?: ObservableMaybe<number | string>
}
interface ForeignObjectSVGAttributes<T>
  extends NewViewportSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'display' | 'visibility'> {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
}
interface GSVGAttributes<T>
  extends ContainerElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'display' | 'visibility'> {}
interface ImageSVGAttributes<T>
  extends NewViewportSVGAttributes<T>,
    GraphicsElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'color-profile' | 'image-rendering'> {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
  preserveAspectRatio?: ObservableMaybe<ImagePreserveAspectRatio>
  href?: ObservableMaybe<string>
}
interface LineSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'marker-start' | 'marker-mid' | 'marker-end'> {
  x1?: ObservableMaybe<number | string>
  y1?: ObservableMaybe<number | string>
  x2?: ObservableMaybe<number | string>
  y2?: ObservableMaybe<number | string>
}
interface LinearGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
  x1?: ObservableMaybe<number | string>
  x2?: ObservableMaybe<number | string>
  y1?: ObservableMaybe<number | string>
  y2?: ObservableMaybe<number | string>
}
interface MarkerSVGAttributes<T>
  extends ContainerElementSVGAttributes<T>,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    FitToViewBoxSVGAttributes,
    Pick<PresentationSVGAttributes, 'overflow' | 'clip'> {
  markerUnits?: ObservableMaybe<'strokeWidth' | 'userSpaceOnUse'>
  refX?: ObservableMaybe<number | string>
  refY?: ObservableMaybe<number | string>
  markerWidth?: ObservableMaybe<number | string>
  markerHeight?: ObservableMaybe<number | string>
  orient?: ObservableMaybe<string>
}
interface MaskSVGAttributes<T>
  extends Omit<ContainerElementSVGAttributes<T>, 'opacity' | 'filter'>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes {
  maskUnits?: ObservableMaybe<SVGUnits>
  maskContentUnits?: ObservableMaybe<SVGUnits>
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
}
type MetadataSVGAttributes<T> = CoreSVGAttributes<T>
interface PathSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'marker-start' | 'marker-mid' | 'marker-end'> {
  d?: ObservableMaybe<string>
  pathLength?: ObservableMaybe<number | string>
}
interface PatternSVGAttributes<T>
  extends ContainerElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    FitToViewBoxSVGAttributes,
    Pick<PresentationSVGAttributes, 'overflow' | 'clip'> {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
  patternUnits?: ObservableMaybe<SVGUnits>
  patternContentUnits?: ObservableMaybe<SVGUnits>
  patternTransform?: ObservableMaybe<string>
}
interface PolygonSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'marker-start' | 'marker-mid' | 'marker-end'> {
  points?: ObservableMaybe<string>
}
interface PolylineSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'marker-start' | 'marker-mid' | 'marker-end'> {
  points?: ObservableMaybe<string>
}
interface RadialGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
  cx?: ObservableMaybe<number | string>
  cy?: ObservableMaybe<number | string>
  r?: ObservableMaybe<number | string>
  fx?: ObservableMaybe<number | string>
  fy?: ObservableMaybe<number | string>
}
interface RectSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ShapeElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
  rx?: ObservableMaybe<number | string>
  ry?: ObservableMaybe<number | string>
}
interface StopSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    StylableSVGAttributes,
    Pick<PresentationSVGAttributes, 'color' | 'stop-color' | 'stop-opacity'> {
  offset?: ObservableMaybe<number | string>
}
interface SvgSVGAttributes<T>
  extends ContainerElementSVGAttributes<T>,
    NewViewportSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    FitToViewBoxSVGAttributes,
    ZoomAndPanSVGAttributes,
    PresentationSVGAttributes {
  version?: ObservableMaybe<string>
  baseProfile?: ObservableMaybe<string>
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
  contentScriptType?: ObservableMaybe<string>
  contentStyleType?: ObservableMaybe<string>
  xmlns?: ObservableMaybe<string>
}
interface SwitchSVGAttributes<T>
  extends ContainerElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'display' | 'visibility'> {}
interface SymbolSVGAttributes<T>
  extends ContainerElementSVGAttributes<T>,
    NewViewportSVGAttributes<T>,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    FitToViewBoxSVGAttributes {}
interface TextSVGAttributes<T>
  extends TextContentElementSVGAttributes<T>,
    GraphicsElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes,
    Pick<PresentationSVGAttributes, 'writing-mode' | 'text-rendering'> {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  dx?: ObservableMaybe<number | string>
  dy?: ObservableMaybe<number | string>
  rotate?: ObservableMaybe<number | string>
  textLength?: ObservableMaybe<number | string>
  lengthAdjust?: ObservableMaybe<'spacing' | 'spacingAndGlyphs'>
}
interface TextPathSVGAttributes<T>
  extends TextContentElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    Pick<
      PresentationSVGAttributes,
      'alignment-baseline' | 'baseline-shift' | 'display' | 'visibility'
    > {
  startOffset?: ObservableMaybe<number | string>
  method?: ObservableMaybe<'align' | 'stretch'>
  spacing?: ObservableMaybe<'auto' | 'exact'>
  href?: ObservableMaybe<string>
}
interface TSpanSVGAttributes<T>
  extends TextContentElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    Pick<
      PresentationSVGAttributes,
      'alignment-baseline' | 'baseline-shift' | 'display' | 'visibility'
    > {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  dx?: ObservableMaybe<number | string>
  dy?: ObservableMaybe<number | string>
  rotate?: ObservableMaybe<number | string>
  textLength?: ObservableMaybe<number | string>
  lengthAdjust?: ObservableMaybe<'spacing' | 'spacingAndGlyphs'>
}
interface UseSVGAttributes<T>
  extends GraphicsElementSVGAttributes<T>,
    ConditionalProcessingSVGAttributes,
    ExternalResourceSVGAttributes,
    StylableSVGAttributes,
    TransformableSVGAttributes {
  x?: ObservableMaybe<number | string>
  y?: ObservableMaybe<number | string>
  width?: ObservableMaybe<number | string>
  height?: ObservableMaybe<number | string>
  href?: ObservableMaybe<string>
}
interface ViewSVGAttributes<T>
  extends CoreSVGAttributes<T>,
    ExternalResourceSVGAttributes,
    FitToViewBoxSVGAttributes,
    ZoomAndPanSVGAttributes {
  viewTarget?: ObservableMaybe<string>
}

// #endregion

declare module '@rxjsx/core' {
  interface JsxIntrinsicElements {
    a: AnchorHTMLAttributes<HTMLAnchorElement>
    abbr: HTMLAttributes<HTMLElement>
    address: HTMLAttributes<HTMLElement>
    area: AreaHTMLAttributes<HTMLAreaElement>
    article: HTMLAttributes<HTMLElement>
    aside: HTMLAttributes<HTMLElement>
    audio: AudioHTMLAttributes<HTMLAudioElement>
    b: HTMLAttributes<HTMLElement>
    base: BaseHTMLAttributes<HTMLBaseElement>
    bdi: HTMLAttributes<HTMLElement>
    bdo: HTMLAttributes<HTMLElement>
    big: HTMLAttributes<HTMLElement>
    blockquote: BlockquoteHTMLAttributes<HTMLElement>
    body: HTMLAttributes<HTMLBodyElement>
    br: HTMLAttributes<HTMLBRElement>
    button: ButtonHTMLAttributes<HTMLButtonElement>
    canvas: CanvasHTMLAttributes<HTMLCanvasElement>
    caption: HTMLAttributes<HTMLElement>
    cite: HTMLAttributes<HTMLElement>
    code: HTMLAttributes<HTMLElement>
    col: ColHTMLAttributes<HTMLTableColElement>
    colgroup: ColgroupHTMLAttributes<HTMLTableColElement>
    data: DataHTMLAttributes<HTMLElement>
    datalist: HTMLAttributes<HTMLDataListElement>
    dd: HTMLAttributes<HTMLElement>
    del: HTMLAttributes<HTMLElement>
    details: DetailsHtmlAttributes<HTMLDetailsElement>
    dfn: HTMLAttributes<HTMLElement>
    dialog: DialogHtmlAttributes<HTMLDialogElement>
    div: HTMLAttributes<HTMLDivElement>
    dl: HTMLAttributes<HTMLDListElement>
    dt: HTMLAttributes<HTMLElement>
    em: HTMLAttributes<HTMLElement>
    embed: EmbedHTMLAttributes<HTMLEmbedElement>
    fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>
    figcaption: HTMLAttributes<HTMLElement>
    figure: HTMLAttributes<HTMLElement>
    footer: HTMLAttributes<HTMLElement>
    form: FormHTMLAttributes<HTMLFormElement>
    h1: HTMLAttributes<HTMLHeadingElement>
    h2: HTMLAttributes<HTMLHeadingElement>
    h3: HTMLAttributes<HTMLHeadingElement>
    h4: HTMLAttributes<HTMLHeadingElement>
    h5: HTMLAttributes<HTMLHeadingElement>
    h6: HTMLAttributes<HTMLHeadingElement>
    head: HTMLAttributes<HTMLHeadElement>
    header: HTMLAttributes<HTMLElement>
    hgroup: HTMLAttributes<HTMLElement>
    hr: HTMLAttributes<HTMLHRElement>
    html: HTMLAttributes<HTMLHtmlElement>
    i: HTMLAttributes<HTMLElement>
    iframe: IframeHTMLAttributes<HTMLIFrameElement>
    img: ImgHTMLAttributes<HTMLImageElement>
    input: InputHTMLAttributes<HTMLInputElement>
    ins: InsHTMLAttributes<HTMLModElement>
    kbd: HTMLAttributes<HTMLElement>
    keygen: KeygenHTMLAttributes<HTMLElement>
    label: LabelHTMLAttributes<HTMLLabelElement>
    legend: HTMLAttributes<HTMLLegendElement>
    li: LiHTMLAttributes<HTMLLIElement>
    link: LinkHTMLAttributes<HTMLLinkElement>
    main: HTMLAttributes<HTMLElement>
    map: MapHTMLAttributes<HTMLMapElement>
    mark: HTMLAttributes<HTMLElement>
    menu: MenuHTMLAttributes<HTMLElement>
    menuitem: HTMLAttributes<HTMLElement>
    meta: MetaHTMLAttributes<HTMLMetaElement>
    meter: MeterHTMLAttributes<HTMLElement>
    nav: HTMLAttributes<HTMLElement>
    noindex: HTMLAttributes<HTMLElement>
    noscript: HTMLAttributes<HTMLElement>
    object: ObjectHTMLAttributes<HTMLObjectElement>
    ol: OlHTMLAttributes<HTMLOListElement>
    optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>
    option: OptionHTMLAttributes<HTMLOptionElement>
    output: OutputHTMLAttributes<HTMLElement>
    p: HTMLAttributes<HTMLParagraphElement>
    param: ParamHTMLAttributes<HTMLParamElement>
    picture: HTMLAttributes<HTMLElement>
    pre: HTMLAttributes<HTMLPreElement>
    progress: ProgressHTMLAttributes<HTMLProgressElement>
    q: QuoteHTMLAttributes<HTMLQuoteElement>
    rp: HTMLAttributes<HTMLElement>
    rt: HTMLAttributes<HTMLElement>
    ruby: HTMLAttributes<HTMLElement>
    s: HTMLAttributes<HTMLElement>
    samp: HTMLAttributes<HTMLElement>
    script: ScriptHTMLAttributes<HTMLElement>
    section: HTMLAttributes<HTMLElement>
    select: SelectHTMLAttributes<HTMLSelectElement>
    slot: HTMLSlotElementAttributes
    small: HTMLAttributes<HTMLElement>
    source: SourceHTMLAttributes<HTMLSourceElement>
    span: HTMLAttributes<HTMLSpanElement>
    strong: HTMLAttributes<HTMLElement>
    style: StyleHTMLAttributes<HTMLStyleElement>
    sub: HTMLAttributes<HTMLElement>
    summary: HTMLAttributes<HTMLElement>
    sup: HTMLAttributes<HTMLElement>
    table: HTMLAttributes<HTMLTableElement>
    tbody: HTMLAttributes<HTMLTableSectionElement>
    td: TdHTMLAttributes<HTMLTableCellElement>
    textarea: TextareaHTMLAttributes<HTMLTextAreaElement>
    tfoot: HTMLAttributes<HTMLTableSectionElement>
    th: ThHTMLAttributes<HTMLTableCellElement>
    thead: HTMLAttributes<HTMLTableSectionElement>
    time: TimeHTMLAttributes<HTMLElement>
    title: HTMLAttributes<HTMLTitleElement>
    tr: HTMLAttributes<HTMLTableRowElement>
    track: TrackHTMLAttributes<HTMLTrackElement>
    u: HTMLAttributes<HTMLElement>
    ul: HTMLAttributes<HTMLUListElement>
    var: HTMLAttributes<HTMLElement>
    video: VideoHTMLAttributes<HTMLVideoElement>
    wbr: HTMLAttributes<HTMLElement>
    svg: SvgSVGAttributes<SVGSVGElement>
    animate: AnimateSVGAttributes<SVGAnimateElement>
    animateMotion: AnimateMotionSVGAttributes<SVGAnimateMotionElement>
    animateTransform: AnimateTransformSVGAttributes<SVGAnimateTransformElement>
    circle: CircleSVGAttributes<SVGCircleElement>
    clipPath: ClipPathSVGAttributes<SVGClipPathElement>
    defs: DefsSVGAttributes<SVGDefsElement>
    desc: DescSVGAttributes<SVGDescElement>
    ellipse: EllipseSVGAttributes<SVGEllipseElement>
    feBlend: FeBlendSVGAttributes<SVGFEBlendElement>
    feColorMatrix: FeColorMatrixSVGAttributes<SVGFEColorMatrixElement>
    feComponentTransfer: FeComponentTransferSVGAttributes<SVGFEComponentTransferElement>
    feComposite: FeCompositeSVGAttributes<SVGFECompositeElement>
    feConvolveMatrix: FeConvolveMatrixSVGAttributes<SVGFEConvolveMatrixElement>
    feDiffuseLighting: FeDiffuseLightingSVGAttributes<SVGFEDiffuseLightingElement>
    feDisplacementMap: FeDisplacementMapSVGAttributes<SVGFEDisplacementMapElement>
    feDistantLight: FeDistantLightSVGAttributes<SVGFEDistantLightElement>
    feFlood: FeFloodSVGAttributes<SVGFEFloodElement>
    feFuncA: FeFuncSVGAttributes<SVGFEFuncAElement>
    feFuncB: FeFuncSVGAttributes<SVGFEFuncBElement>
    feFuncG: FeFuncSVGAttributes<SVGFEFuncGElement>
    feFuncR: FeFuncSVGAttributes<SVGFEFuncRElement>
    feGaussianBlur: FeGaussianBlurSVGAttributes<SVGFEGaussianBlurElement>
    feImage: FeImageSVGAttributes<SVGFEImageElement>
    feMerge: FeMergeSVGAttributes<SVGFEMergeElement>
    feMergeNode: FeMergeNodeSVGAttributes<SVGFEMergeNodeElement>
    feMorphology: FeMorphologySVGAttributes<SVGFEMorphologyElement>
    feOffset: FeOffsetSVGAttributes<SVGFEOffsetElement>
    fePointLight: FePointLightSVGAttributes<SVGFEPointLightElement>
    feSpecularLighting: FeSpecularLightingSVGAttributes<SVGFESpecularLightingElement>
    feSpotLight: FeSpotLightSVGAttributes<SVGFESpotLightElement>
    feTile: FeTileSVGAttributes<SVGFETileElement>
    feTurbulence: FeTurbulanceSVGAttributes<SVGFETurbulenceElement>
    filter: FilterSVGAttributes<SVGFilterElement>
    foreignObject: ForeignObjectSVGAttributes<SVGForeignObjectElement>
    g: GSVGAttributes<SVGGElement>
    image: ImageSVGAttributes<SVGImageElement>
    line: LineSVGAttributes<SVGLineElement>
    linearGradient: LinearGradientSVGAttributes<SVGLinearGradientElement>
    marker: MarkerSVGAttributes<SVGMarkerElement>
    mask: MaskSVGAttributes<SVGMaskElement>
    metadata: MetadataSVGAttributes<SVGMetadataElement>
    path: PathSVGAttributes<SVGPathElement>
    pattern: PatternSVGAttributes<SVGPatternElement>
    polygon: PolygonSVGAttributes<SVGPolygonElement>
    polyline: PolylineSVGAttributes<SVGPolylineElement>
    radialGradient: RadialGradientSVGAttributes<SVGRadialGradientElement>
    rect: RectSVGAttributes<SVGRectElement>
    stop: StopSVGAttributes<SVGStopElement>
    switch: SwitchSVGAttributes<SVGSwitchElement>
    symbol: SymbolSVGAttributes<SVGSymbolElement>
    text: TextSVGAttributes<SVGTextElement>
    textPath: TextPathSVGAttributes<SVGTextPathElement>
    tspan: TSpanSVGAttributes<SVGTSpanElement>
    use: UseSVGAttributes<SVGUseElement>
    view: ViewSVGAttributes<SVGViewElement>
  }
}

declare namespace JSX {
  type Element = JsxElement
  interface ElementAttributesProperty {
    props: {}
  }
  interface ElementChildrenAttribute {
    children: {}
  }
  interface IntrinsicAttributes {}
  type ElementClass = never
  type IntrinsicClassAttributes<T> = never
  interface IntrinsicElements extends JsxIntrinsicElements {}
}
