<script setup lang="ts">
import { Chart, Grid, Line, Tooltip } from "vue3-charts";
import type { ChartAxis } from "vue3-charts/dist/types";

const data = ref<{ createdAt: string; rateFloat: number }[]>(
	await $fetch<{ createdAt: string; rateFloat: number }[]>("/api/initial_value")
);

const toDate = ref<string>(new Date(Date.now()).toISOString().slice(0, 16));
const fromDate = ref<string>(
	new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().slice(0, 16)
);
function onDateChange() {
	console.log(new Date(toDate.value).toISOString());
}
async function getNewData() {
	const newData = await $fetch<{ createdAt: string; rateFloat: number }[]>(
		"/api/date_range",
		{
			query: {
				from: new Date(fromDate.value).toISOString(),
				to: new Date(toDate.value).toISOString(),
			},
		}
	).catch((e) => console.log(e));
	if (newData) {
		data.value = newData;
	}
}

const maxPrice = ref(data.value.sort((a, b) => b.rateFloat - a.rateFloat)[0].rateFloat);
const minPrice = ref(data.value.sort((a, b) => a.rateFloat - b.rateFloat)[0].rateFloat);

const dataMin = computed(() => String(minPrice.value - 1000));
const dataMax = computed(() => String(maxPrice.value + 1000));
const axis = ref<ChartAxis>({
	primary: {
		domain: ["dataMin", "dataMax"],
		type: "band",
		hide: true,
	},
	secondary: {
		domain: [
			dataMin.value,
			dataMax.value,
		],
		type: "linear",
		ticks: 24,
	},
});

const normalizedData = computed(() =>
	data.value?.map((d) => ({
		price: d.rateFloat,
		time: new Date(d.createdAt).toLocaleString(),
	}))
);

useHead({
	title: "Тестовое задание для ИП - Агатов Александр Олегович",
});
</script>

<template>
	<div>
		<header>
			<h1>Тестовое задание для ИП - Агатов Александр Олегович</h1>
			<h2>Временной диапазон</h2>
			<label>
				С
				<input type="datetime-local" v-model="fromDate" @input="onDateChange" />
			</label>
			<label>
				По
				<input type="datetime-local" v-model="toDate" />
			</label>
			<button @click="getNewData">Обновить</button>
		</header>
		<template v-if="data">
			<ClientOnly>
				<Chart
					direction="horizontal"
					:axis="axis"
					:size="{ width: 1600, height: 400 }"
					:data="normalizedData!.reverse()"
				>
					<template #layers>
						<Grid />
						<Line
							:data-keys="['time', 'price']"
							:line-style="{ stroke: '#470736' }"
						/>
					</template>
					<template #widgets>
						<Tooltip
							borderColor="#48CAE4"
							:config="{
								price: { label: 'Цена', color: '#000000' },
								time: { label: 'Время', color: '#0077b6' },
							}"
						/>
					</template>
				</Chart>
			</ClientOnly>
		</template>
		<template v-else>
			<p>За указанный период нет данных</p>
		</template>
	</div>
</template>
