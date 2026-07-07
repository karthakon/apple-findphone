#include <pebble.h>

static Window *s_window;
static MenuLayer *s_menu_layer;

static const char *MENU_ITEMS[] = { "Find Phone" };
static const char *SHORTCUT_NAMES[] = { "FindMe" };
static const int NUM_ITEMS = 1;

// Send shortcut name to phone via AppMessage
static void send_shortcut(const char *name) {
  DictionaryIterator *iter;
  app_message_outbox_begin(&iter);
  dict_write_cstring(iter, 0, name);
  app_message_outbox_send();
}

// MenuLayer callbacks
static uint16_t get_num_sections_cb(MenuLayer *layer, void *context) {
  return 1;
}

static uint16_t get_num_rows_cb(MenuLayer *layer, uint16_t section, void *context) {
  return NUM_ITEMS;
}

static int16_t get_header_height_cb(MenuLayer *layer, uint16_t section, void *context) {
  return MENU_CELL_BASIC_HEADER_HEIGHT;
}

static void draw_header_cb(GContext *ctx, const Layer *cell_layer, uint16_t section, void *context) {
  menu_cell_basic_header_draw(ctx, cell_layer, "Shortcuts");
}

static void draw_row_cb(GContext *ctx, const Layer *cell_layer, MenuIndex *cell_index, void *context) {
  menu_cell_basic_draw(ctx, cell_layer, MENU_ITEMS[cell_index->row], NULL, NULL);
}

static void select_cb(MenuLayer *layer, MenuIndex *cell_index, void *context) {
  send_shortcut(SHORTCUT_NAMES[cell_index->row]);
}

static void window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);

  s_menu_layer = menu_layer_create(bounds);
  menu_layer_set_callbacks(s_menu_layer, NULL, (MenuLayerCallbacks){
    .get_num_sections = get_num_sections_cb,
    .get_num_rows = get_num_rows_cb,
    .get_header_height = get_header_height_cb,
    .draw_header = draw_header_cb,
    .draw_row = draw_row_cb,
    .select_click = select_cb,
  });
  menu_layer_set_click_config_onto_window(s_menu_layer, window);
  layer_add_child(window_layer, menu_layer_get_layer(s_menu_layer));
}

static void window_unload(Window *window) {
  menu_layer_destroy(s_menu_layer);
}

static void inbox_received_cb(DictionaryIterator *iter, void *context) {}
static void inbox_dropped_cb(AppMessageResult reason, void *context) {}
static void outbox_sent_cb(DictionaryIterator *iter, void *context) {}
static void outbox_failed_cb(DictionaryIterator *iter, AppMessageResult reason, void *context) {}

int main(void) {
  app_message_register_inbox_received(inbox_received_cb);
  app_message_register_inbox_dropped(inbox_dropped_cb);
  app_message_register_outbox_sent(outbox_sent_cb);
  app_message_register_outbox_failed(outbox_failed_cb);
  app_message_open(64, 64);

  s_window = window_create();
  window_set_window_handlers(s_window, (WindowHandlers){
    .load = window_load,
    .unload = window_unload,
  });
  window_stack_push(s_window, true);
  app_event_loop();
  window_destroy(s_window);
}