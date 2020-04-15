<template>
  <v-container fluid>
    <v-btn width="240" color="primary" tile elevation="0" @click.stop="open(null)">
      <strong>-- タイトル --</strong>
    </v-btn>
    <v-row>
      <v-col cols="12" offset-md="8" md="4">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="検索ワード" single-line hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="entities"
      :page.sync="value.page"
      :options.sync="options"
      :items-per-page="value.itemsPerPage"
      :search="search"
      hide-default-footer
      class="hcmj--data-table"
      @page-count="value.pageCount = $event"
    >
      <template v-slot:item.name="{ item }">
        <span class="hcmj--text-link" @click="open(item)">{{ item.name }}</span>
      </template>
    </v-data-table>
    <v-pagination
      v-if="value.pageCount > 1"
      v-model="value.page"
      :total-visible="7"
      :length="value.pageCount"
      class="mt-5 hcmj--pagination"
    ></v-pagination>
    <Dialog type="company" title="-- タイトル --">
      <FormCompany v-model="seed" @submit="save"></FormCompany>
    </Dialog>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CompanyEntity, { headers, EmptyCompanyEntityFactory } from '@/entities/Company'
import Dialog from '@/components/molecules/Dialog'
import FormCompany from '@/components/organisms/Form/Company'
import { Options } from '@/entities/Options'

export default Vue.extend({
  components: {
    Dialog,
    FormCompany
  },
  props: {
    entities: {
      type: Array as PropType<CompanyEntity[]>,
      required: true
    },
    value: {
      type: Object as PropType<Options>,
      required: true
    }
  },
  data() {
    return {
      headers,
      options: {},
      search: '',
      seed: EmptyCompanyEntityFactory()
    }
  },
  watch: {
    options: {
      handler(value) {
        // TODO: データをAPIから取得してページング処理
        console.log(value)
      },
      deep: true
    }
  },
  methods: {
    save() {
      console.log(this.seed)
      this.$emit('save', this.seed)
    },
    open(entity: CompanyEntity | null) {
      this.seed = entity === null ? EmptyCompanyEntityFactory() : EmptyCompanyEntityFactory(entity.props)
      this.App.state.setDialog('company', true)
    }
  }
})
</script>
